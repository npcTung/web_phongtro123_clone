const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");
const maxToken = require("uniqid");
require("dotenv").config();
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const sendMail = require("../ultils/sendMail");
const { Op } = require("sequelize");
const crypto = require("crypto");

const hasPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

const registerService = ({ phone, password, name, email }) =>
  new Promise(async (resolve, reject) => {
    try {
      const phoneCheck = await db.User.findOne({ where: { phone } });
      const emailCheck = await db.User.findOne({ where: { email } });
      if (phoneCheck) throw new Error("Phone has exised");
      else if (emailCheck) throw new Error("Email has exised");
      else {
        const token = maxToken();
        const emailEdited = `${btoa(email)} @ ${token}`;
        const newUser = await db.User.findOrCreate({
          where: { phone },
          defaults: {
            email: emailEdited,
            phone,
            name,
            password: hasPassword(password),
            id: v4(),
          },
        });
        if (newUser) {
          const htmlMail = `
            <div>
              <img src="https://res.cloudinary.com/npctungadmin/image/upload/v1698740242/quan-ly-phong-tro/logo-phongtro_ogykly.png" alt='logo' />
              <p>Chào bạn</p> <br />
              <p>
                <span>bạn đang tiến hành đăng ký, mã xác nhận của bạn là: 
                  <span style="color:rgb(0,0,0)">
                    <strong style="color:rgb(78,164,220);font-size:15px">${token}</strong>
                  </span>
                </span>
              </p>
              <p>Vui lòng hoàn thành xác nhận trong vòng 5 phút.</p>
              <p>Phòng trọ 123</p>
              <h5>
                <span style="color:rgb(119,119,119);font-size:13px">Đây là thư từ hệ thống, vui lòng không trả lời thư.</span>
              </h5>
          </div>`;
          await sendMail({
            email,
            html: htmlMail,
            subject: "Hoàn tất đăng ký phongtro123",
          });
        }
        setTimeout(async () => {
          await db.User.destroy({ where: { email: emailEdited } });
        }, [5 * 60 * 1000]);
        resolve({
          success: newUser ? true : false,
          mes: newUser
            ? "Vui lòng kiểm tra Email của bạn để kích hoạt tài khoản"
            : "Phát sinh lỗi, vui lòng thử lại sau",
        });
      }
    } catch (err) {
      reject(err);
    }
  });

const finalregisterService = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      const notActivedEmail = await db.User.findOne({
        where: { email: { [Op.regexp]: `${token}$` } },
      });
      if (notActivedEmail) {
        notActivedEmail.email = atob(notActivedEmail?.email?.split("@")[0]);
        notActivedEmail.save();
      }
      resolve({
        success: notActivedEmail ? true : false,
        mes: notActivedEmail
          ? "Đăng ký thành công. Vui lòng đăng nhập"
          : "Phát sinh lỗi, vui lòng thử lại sau",
      });
    } catch (error) {
      reject(error);
    }
  });

const loginService = ({ phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { phone },
        raw: true,
      });
      if (response && bcrypt.compareSync(password, response.password)) {
        const { password, role, refreshToken, ...userData } = response;
        const accessToken = generateAccessToken(response.id, role);
        const newRefreshToken = generateRefreshToken(response.id);
        await db.User.update(
          { refreshToken: newRefreshToken },
          { where: { id: response.id } }
        );
        resolve({ success: true, accessToken, newRefreshToken, userData });
      } else throw new Error("Thông tin không hợp lệ!");
    } catch (err) {
      reject(err);
    }
  });

const refreshAccessTokenService = (cookie) =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await jwt.verify(cookie.refreshToken, process.env.SECRET_KEY);
      const response = await db.User.findOne({
        where: { id: rs.id, refreshToken: cookie.refreshToken },
      });
      resolve({
        success: response ? true : false,
        newAccessToken: response
          ? generateAccessToken(response.id, response.role)
          : "Refresh token not matched",
      });
    } catch (error) {
      reject(error);
    }
  });

const logoutService = (refreshToken) =>
  new Promise(async (resolve, reject) => {
    try {
      await db.User.update({ refreshToken: null }, { where: { refreshToken } });
      resolve({ success: true, mes: "Logout is done" });
    } catch (error) {
      reject(error);
    }
  });

const forgotPasswordService = (email) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { email } });
      if (!user) throw new Error("User not found");
      else {
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.passwordResetToken = crypto
          .createHash("sha256")
          .update(resetToken)
          .digest("hex");
        user.passwordResetExpires = Date.now() + 15 * 60 * 1000;
        user.save();
        const html = `
        <div>
          <img src="https://res.cloudinary.com/npctungadmin/image/upload/v1698740242/quan-ly-phong-tro/logo-phongtro_ogykly.png" alt="logo" />
          <p>Chào bạn</p> <br />
          <p>
            Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. 
              <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Bấn vào đây</a>
          </p>
          <p>Vui lòng hoàn thành xác nhận trong vòng 5 phút.</p>
          <p>Wine House</p>
          <h5>
            <span style="color:rgb(119,119,119);font-size:13px">Đây là thư từ hệ thống, vui lòng không trả lời thư.</span>
          </h5>
        </div>`;
        const rs = await sendMail({ email, html, subject: "Forgot Password" });
        resolve({
          success: rs.response?.includes("OK") ? true : false,
          mes: rs.response?.includes("OK")
            ? "hãy check mail của bạn"
            : "Đã có lỗi! Hãy thử lại sau",
        });
      }
    } catch (error) {
      reject(error);
    }
  });

const resetPasswordService = ({ password, token }) =>
  new Promise(async (resolve, reject) => {
    try {
      const passwordResetToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
      const user = await db.User.findOne({
        where: {
          passwordResetToken,
          passwordResetExpires: { [Op.gt]: Date.now() },
        },
      });
      if (!user) throw new Error("Invalid reset token");
      else {
        user.password = hasPassword(password);
        user.passwordResetToken = undefined;
        user.passwordChangeAt = Date.now();
        user.passwordResetExpires = undefined;
        await user.save();
        resolve({
          success: user ? true : false,
          mes: user ? "Updated password." : "Something went wrong.",
        });
      }
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  loginService,
  registerService,
  finalregisterService,
  refreshAccessTokenService,
  logoutService,
  forgotPasswordService,
  resetPasswordService,
};
