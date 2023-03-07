const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập khoa bệnh"],
      unique: [true, "Tên khoa đã tồn tại"],
    },
    img: {
      type: String,
      required: [true, "Vui lòng cập nhật hình"],
    },
    price: {
      type: String,
      required: [true, "Vui lòng cập nhật giá tiền"],
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

serviceSchema.post("save", async function (doc) {
  console.log("POST save");
  return {};
});

const Services = mongoose.model("Services", serviceSchema);
module.exports = Services;
