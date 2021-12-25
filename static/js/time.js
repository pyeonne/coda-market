// String 타입의 Date를 Date 타입의 Date로 변환해주는 함수
function toDate(date_str) {
  const yyyyMMddhhmmss = String(date_str);

  const sYear = yyyyMMddhhmmss.substring(0, 4);
  const sMonth = yyyyMMddhhmmss.substring(5, 7);
  const sDate = yyyyMMddhhmmss.substring(8, 10);
  const sHour = yyyyMMddhhmmss.substring(11, 13);
  const sMinute = yyyyMMddhhmmss.substring(14, 16);
  const sSecond = yyyyMMddhhmmss.substring(17, 19);

  return new Date(
    Number(sYear),
    Number(sMonth) - 1,
    Number(sDate),
    Number(sHour),
    Number(sMinute),
    Number(sSecond),
  );
}

// (현재 시간 - Post의 마지막 업데이트 시간)을 리턴해주는 함수
// 년, 월, 일, 시, 분, 초 중 하나를 리턴
function getTimeDiff(updatedTime) {
  const currTime = new Date();

  if (currTime.getFullYear() !== updatedTime.getFullYear()) {
    return `${currTime.getFullYear() - updatedTime.getFullYear()}년`;
  }

  if (currTime.getMonth() !== updatedTime.getMonth()) {
    return `${currTime.getMonth() - updatedTime.getMonth()}개월`;
  }

  if (currTime.getDate() !== updatedTime.getDate()) {
    return `${currTime.getDate() - updatedTime.getDate()}일`;
  }

  if (currTime.getHours() !== updatedTime.getHours()) {
    return `${currTime.getHours() - updatedTime.getHours()}시간`;
  }

  if (currTime.getMinutes() !== updatedTime.getMinutes()) {
    return `${currTime.getMinutes() - updatedTime.getMinutes()}분`;
  }

  if (currTime.getSeconds() !== updatedTime.getSeconds()) {
    return `${currTime.getSeconds() - updatedTime.getSeconds()}초`;
  }
}
