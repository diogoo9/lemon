const acceptedCosumeClass = ["residencial", "industrial", "comercial"];
const modalidadeTarifariaAceit = ["convencional", "branca"];

const validCosumo = (array, tipoDeConexao) => {
  const total = array.reduce((total, current) => total + current, 0);
  const media = total / 12;

  const anualConsume = (total / array.length) * 12;
  const co2 = parseFloat(anualConsume * 0.084).toFixed(2);

  console.log("media", media);
  switch (tipoDeConexao) {
    case "monofasico":
      if (media >= 400) {
        return co2;
      }
      return false;

    case "bifasico":
      if (media >= 500) {
        return co2;
      }
      return false;

    default:
      if (media >= 700) {
        return co2;
      }
      return false;
  }
};

const valid = (
  classeDeConsumo,
  historicoDeConsumo,
  tipoDeConexao,
  modalidadeTarifaria
) => {
  const errors = [];
  if (!acceptedCosumeClass.includes(classeDeConsumo)) {
    errors.push("Classe de consumo não aceita");
  }
  if (!modalidadeTarifariaAceit.includes(modalidadeTarifaria)) {
    errors.push("Modalidade tarifária não aceita");
  }
  const total = validCosumo(historicoDeConsumo, tipoDeConexao);

  if (!total) errors.push("Consumo muito baixo para tipo de conexão");

  if (errors.length) {
    return {
      elegivel: false,
      razoesDeInelegibilidade: errors,
    };
  }
  return {
    elegivel: true,
    economiaAnualDeCO2: total,
  };
};

module.exports = valid;
