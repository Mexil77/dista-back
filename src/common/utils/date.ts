export const formatDate = (date: Date): string => {
  let day;
  let month;
  let year;

  day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
