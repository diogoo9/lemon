const Joi = require("joi");

const companySchema = Joi.object().keys({
  numeroDoDocumento: Joi.alternatives()
    .try(
      Joi.string().pattern(new RegExp("^\\d{11}$")).required(),
      Joi.string().pattern(new RegExp("^\\d{14}$")).required()
    )
    .required(),
  tipoDeConexao: Joi.string()
    .valid("monofasico", "bifasico", "trifasico")
    .required(),
  classeDeConsumo: Joi.string()
    .valid("residencial", "industrial", "comercial", "rural", "poderPublico")
    .required(),
  modalidadeTarifaria: Joi.string()
    .valid("azul", "branca", "verde", "convencional")
    .required(),
  historicoDeConsumo: Joi.array()
    .min(3)
    .max(12)
    .items(Joi.number().ruleset.max(9999))
    .required(),
});

module.exports = companySchema;
