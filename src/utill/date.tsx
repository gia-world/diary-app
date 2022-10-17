export const getStringDate = (date: Date) => {
  let year = date.getFullYear();
  let month: string = String(date.getMonth() + 1);
  // let day: number | string = date.getDate();
  // 보는 사람 입장에서 헷갈릴 수 있음
  let day: string = String(date.getDate());

  // day는 number로 받지만, `0${day}`는 string. +,parseInt(),Number() 등으로 변경 시 0이 다시 사라지므로 string 타입 추가
  console.log(day);
  console.log(typeof `0${day}`);
  console.log(`0${day}`);
  console.log(parseFloat(`0${day}`));
  console.log(Number(`0${day}`));

  if (Number(month) < 10) {
    month = `0${month}`;
  }
  if (Number(day) < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
};
