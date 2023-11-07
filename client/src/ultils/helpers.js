import icons from "./icons";
import moment from "moment";
import "moment/locale/vi";

const { BsStar, BsStarFill } = icons;

export const createSlug = (str) =>
  str
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");

export const renderStarFromNumber = (num, size) => {
  const star = [];
  if (!Number(num))
    for (let i = 0; i < +num; i++)
      star.push(<BsStar key={i} size={size || 16} />);
  num = Math.round(num);
  for (let i = 0; i < +num; i++)
    star.push(<BsStarFill key={i} size={size || 16} />);
  for (let i = 5; i > +num; i--)
    star.push(<BsStar key={i} size={size || 16} />);
  return star;
};

export const formatTime = (createAt) => {
  moment.locale("vi");
  return moment(createAt).fromNow();
};

export const generateRange = (start, end) => {
  const length = end + 1 - start;
  return Array.from({ length }, (_, index) => start + index);
};

export const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  const formatPayload = Object.entries(payload);
  for (let i of formatPayload) {
    if (i[1].trim() === "") {
      invalids++;
      setInvalidFields((prev) => [
        ...prev,
        { name: i[0], mes: "Trường này không được để trống~" },
      ]);
    }
  }
  return invalids;
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const formatMoney = (num) => Number(num).toLocaleString();
