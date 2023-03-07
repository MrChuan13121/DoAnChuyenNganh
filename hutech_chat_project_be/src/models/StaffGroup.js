const mongoose = require("mongoose");

const staffGroupSchema = new mongoose.Schema(
  {
    idPersonnel: {
      type: String,
      required: [true, "Vui lòng nhập thông tin nhân viên"],
    },
    idService: {
      type: String,
      required: [true, "Vui lòng cập nhật hình"],
    },
  },
  {
    timestamps: true,
  }
);

staffGroupSchema.post("save", async function (doc) {
  console.log("POST save");
  return {};
});

const StaffGroup = mongoose.model("StaffGroup", staffGroupSchema);
module.exports = StaffGroup;
