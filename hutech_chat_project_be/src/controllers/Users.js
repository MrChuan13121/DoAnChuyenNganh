// const programmingLanguages = require('../services/programmingLanguages.service');
const Users = require("../models/Users");
const fs = require("fs");
const DIR = "./imgs/avatars/";

//Lấy thông tin user
async function getUser(req, res, next) {
  try {
    const userId = req.params.userId;
    const user = await Users.findById(userId);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

//Lấy thông tin user đang đăng nhập
async function getProfile(req, res, next) {
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

//Cập nhật user
async function updateUser(req, res) {
  try {
    console.log("Đã vào đây");
    const id = req.params.userId;
    const userDelImg = await Users.findById(id);
    const imgUser = userDelImg.img;
    console.log(imgUser);
    if (imgUser != "123.jpeg" && imgUser) {
      console.log(DIR + imgUser);
      fs.unlinkSync(DIR + imgUser);
    }

    const file = req.file;
    console.log(file);
    const { nameUser, email, address, phoneNumber, role, status } = req.body;
    console.log("BODY");
    console.log(req.body);
    const user = await Users.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: nameUser,
          email: email,
          address: address,
          phoneNumber: phoneNumber,
          role: role,
          img: file.filename,
          active: status,
        },
      }
    );
    console.log(user);
    res
      .status(200)
      .send({ auth: user, message: "cập nhật thành công", status: 200 });
  } catch (err) {
    res.status(500).send({
      error: err,
      message: "Máy chủ đang bảo trì. Vui lòng thử lại sau",
      status: 500,
    });
  }
}

//Xóa user
async function deleteUser(req, res) {
  try {
    const user = req.user;
    const id = req.params.userId;
    if (user.id != id) {
      await Users.remove({ _id: id });
    } else {
      res.send(false);
    }
    res.status(200).send({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).send(err);
  }
}

//Lấy theo role
async function getAllByRole(req, res) {
  try {
    const role = req.params.role;
    const users = await Users.find({ role: role });
    res.status(200).send({
      code: 200,
      message: "Lấy thành công",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      message: "Lấy thất bại",
      data: error,
    });
  }
}

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  getProfile,
  getAllByRole,
};
