export const formatDate = (date) => {
  const dateObj = new Date(date);
  const hour = dateObj.getHours();
  const min = dateObj.getMinutes();

  return `${formatNum(hour)}:${formatNum(min)}`;
};

export const formatNum = (num) => {
  if (num < 10) return `0${num}`;
  return num;
};
