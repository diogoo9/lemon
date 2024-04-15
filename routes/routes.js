const Router = require("express").Router();
const validCompany = require("../controller/CompanyController.js");

const CompanyRoutes = Router.route("/validarConsumo");
CompanyRoutes.post(validCompany);

module.exports = Router;
