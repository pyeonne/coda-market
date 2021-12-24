function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();
  console.log(
    new Date(
      Date.UTC(year, month, today, hours, minutes, seconds, milliseconds),
    ),
  );
  return new Date(
    Date.UTC(year, month, today, hours, minutes, seconds, milliseconds),
  );
}

export default getCurrentDate;
