const moment = require("moment");

const categoryCode = (value) =>
  value
    .split(" ")
    .map((el) => el.split("")[0].toLocaleUpperCase())
    .join("");

const generateCode = (value) => {
  let output = "";
  value = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("");

  let merge = value + process.env.phongtropro123;
  let length = merge.length;
  for (let i = 0; i < 3; i++) {
    let index =
      i === 2
        ? Math.floor(merge.length / 2 + length / 2)
        : Math.floor(length / 2);
    output += merge.charAt(index);
    length = index;
  }

  return `${value.charAt(5)}${output}`.toUpperCase();
};

const formatDate = (timeObj) => {
  let day = timeObj.getDay() === 0 ? "Chủ nhật" : `Thứ ${timeObj.getDay() + 1}`;
  let date = `${timeObj.getDate()}/${
    timeObj.getMonth() + 1
  }/${timeObj.getFullYear()}`;
  let time = `${timeObj.getHours()}:${timeObj.getMinutes()}`;

  return `${day}, ${time} ${date}`;
};

const generateDate = () => {
  let gapExpire = Math.floor(Math.random() * 29) + 1;
  let today = new Date();
  let expiredDay = moment(today).add(gapExpire, "d").toDate();

  return {
    today: formatDate(today),
    expiredDay: formatDate(expiredDay),
  };
};

module.exports = { categoryCode, generateCode, generateDate };
