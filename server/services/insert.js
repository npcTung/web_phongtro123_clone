const db = require("../models");
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const chothuecanho = require("../data/chothuecanho.json");
const chothuematbang = require("../data/chothuematbang.json");
const chothuephongtro = require("../data/chothuephongtro.json");
const nhachothue = require("../data/nhachothue.json");
const categotries = require("../data/categories");
const slugify = require("slugify");
const categoryCode = require("../ultils/common");

const dataBody = [
  {
    body: chothuecanho.body,
    code: "CTCH",
  },
  {
    body: chothuematbang.body,
    code: "CTMB",
  },
  {
    body: chothuephongtro.body,
    code: "CTPT",
  },
  {
    body: nhachothue.body,
    code: "NCT",
  },
];

const hasPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

const handleEmail = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();

const insertServices = () =>
  new Promise(async (resolve, reject) => {
    try {
      dataBody.forEach((cate) => {
        cate.body.forEach(async (item) => {
          let postId = v4();
          let attributesId = v4();
          let userId = v4();
          let overviewId = v4();

          await db.Post.create({
            id: postId,
            title: item?.header?.title,
            slug: slugify(item?.header?.title),
            star: item?.header?.star,
            address: item?.header?.address,
            attributesId,
            categoryCode: cate.code,
            description: JSON.stringify(item?.mainContent?.content),
            userId,
            overviewId,
            images: JSON.stringify(item?.images),
            label: item?.header?.class?.classType.trim(),
            province: item?.header?.address?.split(",").slice(-1)[0].trim(),
          });
          await db.Attribute.create({
            id: attributesId,
            price: item?.header?.attributes?.price,
            acreage: item?.header?.attributes?.acreage,
            published: item?.header?.attributes?.published,
            hashtag: item?.header?.attributes?.hashtag,
          });
          await db.Overview.create({
            id: overviewId,
            code: item?.overView?.content.find((i) => i.name === "Mã tin:")
              ?.content,
            area: item?.overView?.content.find((i) => i.name === "Khu vực")
              ?.content,
            type: item?.overView?.content.find(
              (i) => i.name === "Loại tin rao:"
            )?.content,
            target: item?.overView?.content.find(
              (i) => i.name === "Đối tượng thuê:"
            )?.content,
            bonus: item?.overView?.content.find((i) => i.name === "Gói tin:")
              ?.content,
            created: item?.overView?.content.find(
              (i) => i.name === "Ngày đăng:"
            )?.content,
            expired: item?.overView?.content.find(
              (i) => i.name === "Ngày hết hạn:"
            )?.content,
          });
          await db.User.create({
            id: userId,
            name: item?.contact?.content.find((i) => i.name === "Liên hệ:")
              ?.content,
            email: `${handleEmail(
              item?.contact?.content.find((i) => i.name === "Liên hệ:")?.content
            )}@gmail.com`,
            password: hasPassword("123456"),
            phone: item?.contact?.content.find((i) => i.name === "Điện thoại:")
              ?.content,
            zalo: item?.contact?.content.find((i) => i.name === "Zalo")
              ?.content,
          });
        });
      });
      resolve("Done Post.");
    } catch (err) {
      reject(err);
    }
  });

const fn = async (cate) => {
  await db.Category.create({
    code: categoryCode(cate.value),
    value: cate.value,
    header: cate.header,
    subheader: cate.subheader,
  });
};

const insertCategoryServices = () =>
  new Promise(async (resolve, reject) => {
    try {
      const promise = [];
      for (let cate of categotries) promise.push(fn(cate));
      await Promise.all(promise);
      resolve("Done Categories.");
    } catch (error) {
      reject(error);
    }
  });

module.exports = { insertServices, insertCategoryServices };
