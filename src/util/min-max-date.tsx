import { formatDate } from './date-format';

// Function get minimum and maximum dates
const minMaxDate = function () {
  // Minimum date
  let min = new Date('1940/01/01 GMT');
  let minDate = formatDate(min);

  // Maximum date (forecast serves 16 days counting today as day 1, so the max date is today+15)
  let max = new Date();
  max.setDate(max.getDate() + 15);
  let maxDate = formatDate(max);

  return { minDate, maxDate };
};

export { minMaxDate };
