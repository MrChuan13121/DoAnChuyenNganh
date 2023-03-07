const Services = require("../models/Service");
const fs = require("fs");
const DIR = "./imgs/services/";

//Lấy các khoa
async function getAllServices(req, res) {
  try {
    const services = await Services.find();
    console.log(services);
    res.status(200).send(services);
  } catch (error) {
    res.status(403).send(error);
  }
}

//Tạo khoa
async function createService(req, res) {
  console.log(req.file);
  let session = null;
  try {
    session = await Services.startSession();
    session.startTransaction();
    await Services.create(
      [
        {
          name: req.body.name,
          img: req.file.filename,
          price: req.body.price,
          status: true,
        },
      ],
      { session: session }
    );
    await session.commitTransaction();
    res.status(200).send({ message: "Thêm khoa thành công!" });
  } catch (error) {
    console.log(error);
    await session.abortTransaction();

    let errors = {};
    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errors[key] = "Giá trị nhập vào không đúng";
      });
      console.log(errors);
      return res.status(400).json(errors);
    }

    if (error.code === 11000) {
      Object.values(error.keyValue).forEach((key) => {
        errors.name = key + " đã tồn tại";
      });
      console.log(errors);
      return res.status(400).send(errors);
    }

    console.error("Error: ", error);
    res.status(500).send("Something went wrong");
  }
}

//Cập nhật khoa
async function updateService(req, res) {
  let session = null;
  try {
    session = await Services.startSession();
    session.startTransaction();
    const id = req.params.id;

    const service = await Services.findById(id);
    if (!service) {
      res.status(403).send({
        code: 403,
        message: "Khoa không tồn tại",
      });
    } else if (req.file != undefined) {
      try {
        console.log(req.file);
        console.log("vao day");
        const imgService = service.img;
        if (imgService) {
          console.log(DIR + imgService);
          fs.unlinkSync(DIR + imgService);
        }

        service.name = req.body.name;
        service.img = req.file.filename;
        service.price = req.body.price;
        service.active = req.body.active;
        service.save();
        await session.commitTransaction();
        res.status(200).send({
          code: 200,
          message: "Cập nhật thành công",
          data: updateService,
        });
      } catch (error) {
        console.log(">>>>Error: " + error);
      }
    } else {
      try {
        service.name = req.body.name;
        service.img = req.body.img;
        service.price = req.body.price;
        service.active = req.body.active;
        service.save();
        await session.commitTransaction();
        res.status(200).send({
          code: 200,
          message: "Cập nhật thành công",
          data: updateService,
        });
      } catch (error) {
        console.log(">>>Error:" + error);
      }
    }
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

//Xóa khoa
async function deleteService(req, res) {
  const id = req.params.id;

  let session = null;
  try {
    session = await Services.startSession();
    session.startTransaction();
    const service = await Services.findById(id);
    if (!service) {
      res.status(403).send({
        code: 403,
        message: "Khoa không tồn tại",
      });
    } else {
      const imgService = service.img;
      if (imgService) {
        console.log(DIR + imgService);
        fs.unlinkSync(DIR + imgService);
      }
      service
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

module.exports = {
  getAllServices,
  createService,
  updateService,
  deleteService,
};
