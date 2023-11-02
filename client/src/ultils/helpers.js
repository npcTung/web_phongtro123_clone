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
