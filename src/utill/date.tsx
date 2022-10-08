export const getStringDate = (date: Date) => {
  let year = date.getFullYear();
  let month: number | string = date.getMonth() + 1;
  let day: number | string = date.getDate();
  // day는 number로 받지만, `0${day}`는 string. +,parseInt(),Number() 등으로 변경 시 0이 다시 사라지므로 string 타입 추가
  console.log(day);
  console.log(typeof `0${day}`);
  console.log(`0${day}`);
  console.log(parseFloat(`0${day}`));
  console.log(Number(`0${day}`));
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
};
