const getNumberedFromString = (string) => {
  let number = 0;
  if (string.search("đồng/tháng") !== -1) {
    number = +string.match(/\d+/)[0] / Math.pow(10, 3);
  } else if (string.search("triệu/tháng") !== -1) {
    number = +string.match(/\d+/)[0];
  } else if (string.search("m")) {
    number = +string.match(/\d+/)[0];
  }
  return number;
};

const getNumberedFromStringV2 = (string) => {
  let number = 0;
  if (string.search("đồng/tháng") !== -1) {
    number = +string.match(/\d+/)[0] / Math.pow(10, 3);
  } else if (string.search("triệu/tháng") !== -1) {
    number = +string.split(" ")[0];
  } else if (string.search("m")) {
    number = +string.match(/\d+/)[0];
  }
  return +number;
};

const categoryCode = (value) =>
  value
    .split(" ")
    .map((el) => el.split("")[0].toLocaleUpperCase())
    .join("");

module.exports = {
  getNumberedFromString,
  getNumberedFromStringV2,
  categoryCode,
};
