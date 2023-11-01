const categoryCode = (value) =>
  value
    .split(" ")
    .map((el) => el.split("")[0].toLocaleUpperCase())
    .join("");

module.exports = categoryCode;
