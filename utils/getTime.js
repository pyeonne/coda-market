function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();
<<<<<<< HEAD
  console.log(
    new Date(
      Date.UTC(year, month, today, hours, minutes, seconds, milliseconds),
    ),
  );
=======

>>>>>>> e8a3391e4abc4e3260d4459693e7df0882d3f908
  return new Date(
    Date.UTC(year, month, today, hours, minutes, seconds, milliseconds),
  );
}

export default getCurrentDate;
