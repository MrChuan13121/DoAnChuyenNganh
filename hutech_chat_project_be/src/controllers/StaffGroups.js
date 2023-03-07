const Services = require("../models/Service");
const StaffGroup = require("../models/StaffGroup");
const Users = require("../models/Users");
//Thêm nhân viên vào khoa
async function addStaffGroup(req, res) {
  try {
    const personnel = await Users.findById(req.body.idPersonnel);
    const service = await Services.findById(req.body.idService);
    const staffGroup = await StaffGroup.create({
      idPersonnel: personnel.id,
      idService: service.id,
    });
    res.status(200).send(staffGroup);
  } catch (error) {
    res.status(500).send(error);
  }
}

//Lấy danh sách các nhân viên theo service
async function getStaffGroupByName(req, res) {
  try {
    const id = req.params.idService;
    const service = await Services.findById(id);
    const listStaffGroup = await StaffGroup.find({ idService: service.id });
    const listPersonnel = [];
    console.log(listStaffGroup);

    for (let index = 0; index < listStaffGroup.length; index++) {
      const personnel = await Users.findById(listStaffGroup[index].idPersonnel);
      listPersonnel.push(personnel);
    }

    // console.log(listPersonnel);
    // listStaffGroup.map(async (element) => {
    //   const personnel = await Users.findById(element.idPersonnel);
    //   await listPersonnel.push(personnel);
    // });

    res.status(200).send(listPersonnel);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getStaffGroupByName,
  addStaffGroup,
};
