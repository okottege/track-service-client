const formatDate = date => {
  if (!date) return null;

  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

const formatDateWithoutTime = date => {
  const dateObj = new Date(date);
  const day = `${dateObj.getDate()}`.padStart(2, '0');
  const month = `${dateObj.getMonth() + 1}`.padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${year}-${month}-${day}`;
};

export { formatDate, formatDateWithoutTime };
