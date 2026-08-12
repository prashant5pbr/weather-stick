// Function to capitalize the first letters of all the words in a given text
const titleCase = function (text: string) {
  if (!text.trim()) {
    return '';
  }

  let result = text
    .trim()
    .split(/\s+/)
    .map((val) => val[0].toUpperCase() + val.slice(1).toLowerCase());

  return result.join(' ');
};

export { titleCase };
