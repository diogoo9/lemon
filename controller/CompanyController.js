const Joi = require("joi");
const companySchema = require("../schemas/companySchema");
const valid = require("../service/CompanyService");

const validCompany = (req, res) => {
  const schema = companySchema;
  const { error } = schema.validate(req.body);
  if (error) {
    return res.json(error);
  }
  const {
    classeDeConsumo,
    historicoDeConsumo,
    tipoDeConexao,
    modalidadeTarifaria,
  } = req.body;

  const response = valid(
    classeDeConsumo,
    historicoDeConsumo,
    tipoDeConexao,
    modalidadeTarifaria
  );

  return res.json(response);
};

module.exports = validCompany;
