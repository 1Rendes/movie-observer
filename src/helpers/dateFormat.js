export function formatDate(date) {
  const [year, month, day] = date.split("-");
  const months = [
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
  const monthName = months[parseInt(month) - 1];
  const formattedDate = `${parseInt(day)} ${monthName} ${year}`;
  return formattedDate;
}
