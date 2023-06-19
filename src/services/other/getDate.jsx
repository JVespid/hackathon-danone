export const ActualDate = () => {
  const newDate = new Date();

  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const hour = newDate.getHours() + 1;
  const minutes = newDate.getMinutes();
  const seconds = newDate.getSeconds();

  const actualDateStr = `${year}${month}${day}${hour}${minutes}${seconds}`;
  const expiredDateStr = `${year}${
    month + 1 > 12 ? 1 : month + 1
  }${day}${hour}${minutes}${seconds}`;
  
  const actualDateInt = parseInt(actualDateStr);
  const expiredDateInt = parseInt(expiredDateStr);

  return { actualDate: actualDateInt, expiredDate: expiredDateInt };
};
