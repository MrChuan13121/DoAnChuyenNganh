const AppError = require("../utils/app-error");

const authRole = (permission) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (!permission.includes(role)) {
      return next(
        new AppError(401, "fail", "Bạn không có quyền thực hiện chức năng!")
      );
    }
    console.log("đã có quyền");
    next();
  };
};

module.exports = {
  authRole,
};
