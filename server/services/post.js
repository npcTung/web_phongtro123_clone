const db = require("../models");
const generatedId = require("uuid").v4;
const { generateDate, generateCode } = require("../ultils/common");
const cloudinary = require("cloudinary").v2;
const { Op } = require("sequelize");

const createNewPostService = (body, userId) =>
  new Promise(async (resolve, reject) => {
    try {
      let attributesId = generatedId();
      let overviewId = generatedId();
      let hashtag = Math.floor(Math.random() * Math.pow(10, 6));
      let currentDate = generateDate();
      let description = body.description?.split(",");
      let province = {
        code: generateCode(body.province).trim(),
        value: body.province,
      };
      const response = await db.Post.create({
        id: generatedId(),
        title: body.title,
        slug: body.slug,
        address: body.address || null,
        attributesId,
        categoryCode: body.categoryCode,
        description: JSON.stringify(description) || null,
        userId,
        images: JSON.stringify(body.images),
        fileNameImages: JSON.stringify(body.fileNameImages),
        label: body.label,
        provinceCode: province.code,
        overviewId,
      });
      if (response) {
        await db.Attribute.create({
          id: attributesId,
          price: body.price,
          acreage: body.acreage,
          hashtag,
        });
        await db.Overview.create({
          id: overviewId,
          code: `#${hashtag}`,
          area: body.label,
          type: body?.type,
          target: body?.target,
          bonus: "Tin thường",
          created: currentDate.today,
          expired: currentDate.expiredDay,
        });
        await db.Province.findOrCreate({
          where: { code: province.code },
          defaults: province,
        });
      } else
        cloudinary.api.delete_resources(body.fileNameImages?.map((el) => el));
      resolve({
        success: response ? true : false,
        mes: response ? "Created." : "Create failed",
      });
    } catch (error) {
      reject(error);
    }
  });

const getPostsService = ({ page, limit, order, title, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = { raw: true, nest: true };
      const offset = !page || +page <= 1 ? 0 : +page - 1;
      const fLimit = +limit || +process.env.LIMIT;
      const attributes = { exclude: ["updatedAt"] };
      const includes = [
        {
          model: db.Attribute,
          as: "attributes",
          attributes: ["price", "acreage", "hashtag"],
        },
        {
          model: db.User,
          as: "user",
          attributes: ["name", "zalo", "phone", "avatar", "isBlocked"],
        },
        {
          model: db.Overview,
          as: "overviews",
          attributes: ["created", "expired", "target"],
        },
      ];
      queries.offset = offset * fLimit;
      queries.limit = fLimit;
      queries.attributes = attributes;
      queries.include = includes;
      if (order) queries.order = [order];
      if (title) query.title = { [Op.substring]: title };
      const response = await db.Post.findAndCountAll({
        where: query,
        ...queries,
      });
      resolve({
        success: response ? true : false,
        postData: response ? response : "Getting posts is failed.",
      });
    } catch (error) {
      reject(error);
    }
  });

const getPostService = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = { raw: true, nest: true };
      const includes = [
        {
          model: db.Attribute,
          as: "attributes",
          attributes: ["price", "acreage", "hashtag"],
        },
        {
          model: db.User,
          as: "user",
          attributes: ["name", "zalo", "phone", "avatar"],
        },
        {
          model: db.Overview,
          as: "overviews",
          attributes: [
            "code",
            "area",
            "type",
            "target",
            "bonus",
            "created",
            "expired",
          ],
        },
      ];
      queries.include = includes;
      const response = await db.Post.findOne({
        where: { id: pid },
        ...queries,
      });
      resolve({
        success: response ? true : false,
        currentPort: response ? response : "Getting current post is failed.",
      });
    } catch (error) {
      reject(error);
    }
  });

const deletePostService = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const post = await db.Post.findOne({ where: { id: pid } });
      const images = JSON.parse(
        post && post.fileNameImages && post.fileNameImages
      );
      const response = await db.Post.destroy({
        where: { id: pid },
      });
      if (response && post) {
        cloudinary.api.delete_resources(images?.map((el) => el));
        await db.Attribute.destroy({ where: { id: post.attributesId } });
        await db.Overview.destroy({ where: { id: post.overviewId } });
      }
      resolve({
        success: response > 0 ? true : false,
        mes: response > 0 ? "Delete" : "No post delete.",
      });
    } catch (error) {
      reject(error);
    }
  });

const getPostsLimitUserService = (
  uid,
  { page, limit, order, title, ...query }
) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = { raw: true, nest: true };
      const offset = !page || +page <= 1 ? 0 : +page - 1;
      const fLimit = +limit || +process.env.LIMIT;
      const attributes = { exclude: ["updatedAt"] };
      const includes = [
        {
          model: db.Attribute,
          as: "attributes",
          attributes: ["price", "acreage", "hashtag"],
        },
        {
          model: db.User,
          as: "user",
          attributes: ["name", "zalo", "phone", "avatar", "isBlocked"],
        },
        {
          model: db.Overview,
          as: "overviews",
          attributes: ["created", "expired", "target"],
        },
      ];
      queries.offset = offset * fLimit;
      queries.limit = fLimit;
      queries.attributes = attributes;
      queries.include = includes;
      if (order) queries.order = [order];
      if (title) query.title = { [Op.substring]: title };
      query.userId = uid;
      const response = await db.Post.findAndCountAll({
        where: query,
        ...queries,
      });
      resolve({
        success: response ? true : false,
        postAdminData: response ? response : "Getting posts admin is failed.",
      });
    } catch (error) {
      reject(error);
    }
  });

const updatePostService = (pid, uid, { ...body }) =>
  new Promise(async (resolve, reject) => {
    try {
      let description = body.description?.split(",");
      let province = {
        code: generateCode(body.province).trim(),
        value: body.province,
      };
      const post = await db.Post.findOne({ where: { id: pid } });
      const images = JSON.parse(
        post && post.fileNameImages && post.fileNameImages
      );
      if (post.userId === uid) {
        const attributesId = post.attributesId;
        const overviewId = post.overviewId;
        const response = await db.Post.update(
          {
            title: body.title,
            slug: body.slug,
            address: body.address,
            categoryCode: body.categoryCode,
            description: JSON.stringify(description),
            images: JSON.stringify(body.images),
            fileNameImages: JSON.stringify(body.fileNameImages),
            provinceCode: province.code,
            lable: body?.label,
          },
          { where: { id: pid } }
        );
        if (response) {
          await db.Attribute.update(
            {
              price: body.price,
              acreage: body.acreage,
            },
            { where: { id: attributesId } }
          );
          await db.Overview.update(
            {
              area: body.label,
              type: body?.type,
              target: body?.target,
            },
            { where: { id: overviewId } }
          );
          if (post.fileNameImages && body.fileNameImages)
            cloudinary.api.delete_resources(images?.map((el) => el));
        } else
          cloudinary.api.delete_resources(body.fileNameImages?.map((el) => el));
        resolve({
          success: response ? true : false,
          mes: resolve ? "Updated" : "Update failed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  createNewPostService,
  getPostsService,
  deletePostService,
  getPostService,
  getPostsLimitUserService,
  updatePostService,
};
