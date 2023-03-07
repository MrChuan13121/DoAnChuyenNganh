const ServicesController = require("./Services");

async function getDataToHome(req, res) {
  try {
    const service = await ServicesController.getAllServices();
    res.status(200).send(service);
  } catch (error) {
    res.status(401).send(error);
    console.log(error);
  }
}

module.exports = {
  getDataToHome,
};
