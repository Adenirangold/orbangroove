export const daysArray = Array.from({ length: 31 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);
export const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentYear = new Date().getFullYear();
const startYear = 1924;
const minimumAge = 16;
const cutoffYear = currentYear - minimumAge;

export const yearsArray = Array.from(
  { length: cutoffYear - startYear + 1 },
  (_, index) => (startYear + index).toString()
);
