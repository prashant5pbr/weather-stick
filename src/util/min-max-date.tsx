import { formatDate } from './date-format';

// Function get minimum and maximum dates
const minMaxDate = function () {
  // Minimum date
  let min = new Date('1940/01/01 GMT');
  let minDate = formatDate(min);

  // Maximum date
  let max = new Date();
  max.setDate(max.getDate() + 16);
  let maxDate = formatDate(max);

  return { minDate, maxDate };
};

export { minMaxDate };
