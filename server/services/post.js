const db = require("../models");
const generatedId = require("uuid").v4;
const moment = require("moment");
const generateDate = require("../ultils/generateDate");
const cloudinary = require("cloudinary").v2;

const createNewPostService = (body, userId) =>
  new Promise(async (resolve, reject) => {
    try {
      let attributesId = generatedId();
      let overviewId = generatedId();
      let hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`;
      let currentDate = generateDate();
      let description = body.description?.split(",");
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
        province: body.province,
        overviewId,
      });
      if (response) {
        await db.Attribute.create({
          id: attributesId,
          price:
            +body.priceNumber < 1
              ? `${+body.priceNumber * 1000000} VND/tháng`
              : `${body.priceNumber} triệu/tháng`,
          acreage: `${body.areaNumber} m2`,
          published: moment(new Date()).format("DD/MM/YYYY"),
          hashtag,
        });
        await db.Overview.create({
          id: overviewId,
          code: hashtag,
          area: body.label,
          type: body?.category,
          target: body?.target,
          bonus: "Tin thường",
          created: currentDate.today,
          expired: currentDate.expiredDay,
        });
      }
      resolve({
        success: response ? true : false,
        mes: response ? "Created." : "Create failed",
      });
    } catch (error) {
      reject(error);
    }
  });

const getPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "zalo", "phone"],
          },
        ],
        attributes: { exclude: ["updatedAt"] },
      });
      resolve({
        success: response ? true : false,
        postData: response ? response : "Getting posts is failed.",
        count: response.length || 0,
      });
    } catch (error) {
      reject(error);
    }
  });

const getPostService = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findOne({
        where: { id: pid },
        raw: true,
        nest: true,
        include: [
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "zalo", "phone"],
          },
        ],
      });
      resolve({
        success: response ? true : false,
        currentPort: response ? response : "Getting current post is failed.",
      });
    } catch (error) {
      reject(error);
    }
  });

const getPostsLimitService = (page, { limitPost, order, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page;
      const queries = { ...query };
      const limit = +limitPost || +process.env.LIMIT;
      queries.limit = limit;
      if (order) queries.order = [order];
      const response = await db.Post.findAndCountAll({
        where: query,
        raw: true,
        nest: true,
        offset: offset * limit,
        ...queries,
        include: [
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "zalo", "phone", "avatar"],
          },
          {
            model: db.Overview,
            as: "overviews",
          },
        ],
        attributes: [
          "id",
          "title",
          "star",
          "address",
          "description",
          "createdAt",
        ],
      });
      resolve({
        success: response ? true : false,
        postData: response ? response : "Getting posts limit is failed.",
      });
    } catch (error) {
      reject(error);
    }
  });

const deletePostService = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const post = await db.Post.findOne({ where: { id: pid } });
      const response = await db.Post.destroy({
        where: { id: pid },
      });
      if (response && post) {
        const image = await db.Image.destroy({ where: { id: post.imagesId } });
        if (image)
          cloudinary.api.delete_resources(
            post.images.fileNameImages?.map((el) => el)
          );
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

const getNewPostService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        offset: 0,
        order: [["createdAt", "DESC"]],
        limit: +process.env.LIMIT,
        include: [
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price"],
          },
        ],
        attributes: ["id", "title", "star", "createdAt"],
      });
      resolve({
        success: response ? true : false,
        newPostData: response ? response : "Getting new post is failed.",
      });
    } catch (error) {
      reject(error);
    }
  });

const getPostsLimitUserService = (page, userId, query) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      const queries = { ...query, userId };
      const response = await db.Post.findAndCountAll({
        where: queries,
        raw: true,
        nest: true,
        offset: offset * +process.env.LIMIT,
        limit: +process.env.LIMIT,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
          {
            model: db.Overview,
            as: "overviews",
          },
        ],
        attributes: ["id", "title", "star", "address", "description"],
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
      const post = await db.Post.findOne({ where: { id: pid } });
      if (post.userId === uid) {
        const attributesId = post.attributesId;
        const overviewId = post.overviewId;
        const response = await db.Post.update(
          {
            title: body.title,
            slug: body.slug,
            address: body.address || null,
            categoryCode: body.categoryCode,
            description: JSON.stringify(description) || null,
            images: body.images || null,
            fileNameImages: body.fileNameImages || null,
            province: body?.province?.includes("Thành phố")
              ? body?.province?.replace("Thành phố", "")
              : body?.province?.replace("Tỉnh", ""),
            lable: body?.label || null,
          },
          { where: { id: pid } }
        );
        if (response) {
          await db.Attribute.update(
            {
              price:
                +body.priceNumber < 1
                  ? `${+body.priceNumber * 1000000} VND/tháng`
                  : `${body.priceNumber} triệu/tháng`,
              acreage: `${body.areaNumber} m2`,
            },
            { where: { id: attributesId } }
          );
          await db.Overview.update(
            {
              area: body.label,
              type: body?.category,
              target: body?.target,
            },
            { where: { id: overviewId } }
          );
          if (post.fileNameImages && body.fileNameImages)
            cloudinary.api.delete_resources(
              post?.fileNameImages?.map((el) => el)
            );
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
  getPostsLimitService,
  getNewPostService,
  getPostsLimitUserService,
  updatePostService,
};
