import { formatDate } from './date-format';

// Number of rows (days) in one table window: the anchor plus upto next 7 days
const windowDays = 8;

// Anchor offset days to decide between using the archive and forecast endpoint
const archiveAnchorOffset = -20;

// Furthest future day available from the forecast endpoint
const maxFutureOffset = 16;

// Function to build a local-midnight Date from a YYYY-MM-DD string (avoids UTC day-shifting)
const toLocalDate = function (dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};

// Whole-day difference between two dates (a - b)
const dayDiff = function (a: Date, b: Date) {
  return Math.round((a.getTime() - b.getTime()) / 86400000);
};

// Return a new date shifted by the given number of days
const addDays = function (date: Date, days: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

// Given the anchor date, decide which endpoint to hit and the exact date range/days
const getWeatherRequest = function (anchorDateStr: string, archiveURL: string, forecastURL: string) {
  // Today at local midnight for clean whole-day comparisons
  const today = new Date();
  const anchor = toLocalDate(anchorDateStr);

  // Window = anchor plus the next 7 days, truncated at the +16 forecast ceiling
  const maxDay = addDays(today, maxFutureOffset);
  let end = addDays(anchor, windowDays - 1);

  if (end.getTime() > maxDay.getTime()) {
    end = maxDay;
  }

  // Array of dates
  const dateArray: string[] = [];

  // Populate the date array
  for (let d = new Date(anchor); d.getTime() <= end.getTime(); d = addDays(d, 1)) {
    dateArray.push(formatDate(d));
  }

  // Route by how far back the anchor sits: old anchors -> archive, else forecast
  const anchorOffset = dayDiff(anchor, today);
  const baseURL = anchorOffset <= archiveAnchorOffset ? archiveURL : forecastURL;

  return {
    baseURL: baseURL,
    startDate: formatDate(anchor),
    endDate: formatDate(end),
    dateArray,
  };
};

export { getWeatherRequest };
