const Book = require("../models/Book");
const Users = require("../models/Users");

//Lấy các lịch người dùng đã đặt
async function getBooksByUser(req, res) {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const listBook = await Book.find({ userId: userId });
    console.log(listBook);
    res.status(200).send(listBook);
  } catch (error) {
    res.status(500).send(error);
  }
}

//Người dùng đặt lịch
async function createBook(req, res) {
  const user = req.user;
  let session = null;
  try {
    session = await Book.startSession();
    session.startTransaction();
    await Book.create(
      [
        {
          userId: user.id,
          status: 0,
          date: req.body.date,
          time: req.body.time,
          address: "285 Cách Mạng Tháng 8, Phường 12, Quận 10, Hồ Chí Minh",
        },
      ],
      { session: session }
    );
    await session.commitTransaction();
    res.status(200).send({
      message: "Tạo lịch đặt thành công. Vui lòng chờ nhân viên xác nhận!",
    });
  } catch (error) {
    console.log(error);
    await session.abortTransaction();

    let errors = {};
    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      console.log(errors);
      return res.status(400).json(errors);
    }

    if (error.code === 11000) {
      Object.keys(error.keyPattern).forEach((key) => {
        errors[key] = key + " is existed";
      });
      return res.status(400).send(errors);
    }

    console.error("Error: ", error);
    res.status(500).send("Something went wrong");
  }
}

//Xóa lịch đặt
async function deleteBook(req, res) {
  const idBook = req.params.idBook;
  let session = null;
  try {
    session = await Book.startSession();
    session.startTransaction();
    const book = await Book.findById(idBook);
    if (!book) {
      res.status(403).send({
        code: 403,
        message: "Lịch đặt không tồn tại",
      });
    } else {
      book
        .remove()
        .then(async () => {
          await session.commitTransaction();
          res.status(200).send({
            code: 200,
            message: "Xóa thành công",
          });
        })
        .catch(async (err) => {
          res.status(400).json({ error: err });
        });
    }
  } catch (error) {
    await session.abortTransaction();
    res.status(501).send({
      code: 501,
      message: error.message,
      error: true,
    });
  }
}

//Lấy lịch theo trạng thái
async function getBooksByStatus(req, res) {
  try {
    const status = req.params.status;
    console.log(status);
    const listBook = await Book.find({ status: status });
    console.log(listBook);
    res.status(200).send({
      code: 200,
      message: "Thành công",
      data: listBook,
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      message: "Thất bại",
      data: error,
    });
  }
}

//Thay đổi trạng thái đơn hàng
async function setStatusBook(req, res) {
  try {
    const idBook = req.params.idBook;
    const status = req.params.status;
    const book = await Book.findByIdAndUpdate(
      { _id: idBook },
      { status: status }
    );
    book.save();
    res.status(200).send({
      code: 200,
      message: "Thành công",
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      message: "Thất bại",
    });
  }
}

//Lấy thông tin người dùng từ Id lịch đặt
async function getUserByIdBook(req, res) {
  try {
    const idBook = req.params.idBook;
    console.log(idBook);
    const book = await Book.findById(idBook);
    console.log(book);
    const idUser = book.userId;
    const user = await Users.findById(idUser);
    console.log(user);
    if (user) {
      res.status(200).send({
        code: 200,
        message: "success",
        data: user,
      });
    } else {
      res.status(500).send({
        code: 500,
        message: "fail",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      code: 500,
      message: "fail",
      data: error,
    });
  }
}

//Thay đổi lịch hẹn
async function changeTimeBook(req, res) {
  try {
    const idBook = req.params.idBook;
    const date = req.body.date;
    const time = req.body.time;
    console.log(idBook);
    console.log(date);
    console.log(time);
    const book = await Book.findByIdAndUpdate(
      { _id: idBook },
      { date: date, time: time }
    );
    book.save();
    res.status(200).send({
      code: 200,
      message: "Thành công",
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      message: "Thất bại",
    });
  }
}

module.exports = {
  getBooksByUser,
  createBook,
  deleteBook,
  getBooksByStatus,
  setStatusBook,
  getUserByIdBook,
  changeTimeBook,
};
