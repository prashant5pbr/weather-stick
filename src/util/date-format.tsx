// Function to convert the given date to string
const formatDate = (date: Date) => {
  const digits = (num: number) => String(num).padStart(2, '0');
  return `${date.getFullYear()}-${digits(date.getMonth() + 1)}-${digits(date.getDate())}`;
};

export { formatDate };
