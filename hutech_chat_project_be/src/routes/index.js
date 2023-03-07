const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const AuthenticateControler = require("../controllers/Authentication");
const UsersControler = require("../controllers/Users");
const AuthController = require("../controllers/Auth");
const RoomController = require("../controllFirebase/Room");
const MessagesController = require("../controllFirebase/Messages");
const StaffGroupController = require("../controllers/StaffGroups");
const ServicesController = require("../controllers/Services");
const BooksController = require("../controllers/Books");
const Auth = require("../middlewares/Auth");
const fileUpload = require("../utils/fileUpload");
const TestController = require("../controllFirebase/test");

/**
 * Authenticate
 */
router.post("/signup", AuthenticateControler.signup);
router.post("/signin", AuthenticateControler.signin);
router.post("/logout", AuthenticateControler.logout);

/**
 * Manage users
 */

//Lấy danh sách các khoa
router.route("/allServices").get(ServicesController.getAllServices);

// Lấy thông tin người dùng
router.route("/user/:userId").get(UsersControler.getUser);

//Lấy danh sách các nhân viên theo service
router
  .route("/:idService/personnels")
  .get(StaffGroupController.getStaffGroupByName);

// // Lấy thông tin người dùng đang đăng nhập
// router
//   .use(AuthController.protect)
//   .route("/user/profile")
//   .get(UsersControler.getProfile);
//Lấy thông tin người dùng từ Id lịch đặt
router
  .use(AuthController.protect)
  .route("/getUser/:idBook")
  .get(BooksController.getUserByIdBook);

//Thay đổi ngày giờ lịch hẹn
router
  .use(AuthController.protect)
  .route("/change/:idBook")
  .post(BooksController.changeTimeBook);

//Lấy các lịch đã đặt
router
  .use(AuthController.protect)
  .route("/:userId/books")
  .get(BooksController.getBooksByUser);

//Người dùng đặt lịch
router
  .use(AuthController.protect)
  .route("/user/createbook")
  .post(BooksController.createBook);

//Xóa lịch đặt
router
  .use(AuthController.protect)
  .route("/books/delete/:idBook")
  .delete(BooksController.deleteBook);

//Lấy danh sách các theo role
router
  .use(AuthController.protect)
  .route("/getAll/:role")
  .get(UsersControler.getAllByRole);

// Sửa thông tin người dùng
router
  .use(AuthController.protect)
  .use(Auth.authRole(["admin", "personnel", "user"]))
  .route("/updateuser/:userId")
  .post(fileUpload("./imgs/avatars"), UsersControler.updateUser);

//Tạo mới khoa
router
  .use(AuthController.protect)
  .use(Auth.authRole(["admin"]))
  .route("/createService")
  .post(fileUpload("./imgs/services"), ServicesController.createService);

//Cập nhật khoa
router
  .use(AuthController.protect)
  .use(Auth.authRole(["admin"]))
  .route("/updateService/:id")
  .post(fileUpload("./imgs/services"), ServicesController.updateService);

//Xóa khoa
router
  .use(AuthController.protect)
  .use(Auth.authRole(["admin"]))
  .route("/deleteService/:id")
  .delete(ServicesController.deleteService);

// Xoá người dùng
router
  .use(AuthController.protect)
  .use(Auth.authRole(["admin"]))
  .route("/user/:userId")
  .delete(UsersControler.deleteUser);

//Thêm nhân viên vào nhóm
router
  .use(AuthController.protect)
  .use(Auth.authRole(["admin"]))
  .route("/admin/addStaffGroup")
  .post(StaffGroupController.addStaffGroup);

//Lấy số lượng đơn đặt lịch theo trạng thái
router
  .use(AuthController.protect)
  .use(Auth.authRole(["admin"]))
  .route("/books/:status")
  .get(BooksController.getBooksByStatus);

//Xác nhận lịch đặt
router
  .use(AuthController.protect)
  .use(Auth.authRole(["admin"]))
  .route("/:idBook/:status")
  .get(BooksController.setStatusBook);

// // Gửi tin nhắn
// router
//   .use(AuthController.protect)
//   .route("/sendmessage")
//   .post(MessagesController.createmessage);

// // Lấy danh sách các tin nhắn của người dùng
// router.use(AuthController.protect).route("/messages/:userId").post();

module.exports = router;
