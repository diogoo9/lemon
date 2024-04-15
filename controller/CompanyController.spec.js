const validCompany = require("./CompanyController");

describe("Company schema validation", () => {
  test("should be abble return error whe not send numeroDoDocumento", async () => {
    const req = { body: {} };
    const res = { json: (params) => params };
    const response = await validCompany(req, res);

    expect(response.message).toEqual('"numeroDoDocumento" is required');
  });

  test("should be abble return error whe not send tipoDeConexao", async () => {
    const req = {
      body: {
        numeroDoDocumento: "14041737706",
      },
    };
    const res = { json: (params) => params };
    const response = await validCompany(req, res);

    expect(response.message).toEqual('"tipoDeConexao" is required');
  });

  test("should be abble return error whe not send classeDeConsumo", async () => {
    const req = {
      body: {
        numeroDoDocumento: "14041737706",
        tipoDeConexao: "bifasico",
      },
    };
    const res = { json: (params) => params };
    const response = await validCompany(req, res);

    expect(response.message).toEqual('"classeDeConsumo" is required');
  });

  test("should be abble return error whe not send modalidadeTarifaria", async () => {
    const req = {
      body: {
        numeroDoDocumento: "14041737706",
        tipoDeConexao: "bifasico",
        classeDeConsumo: "comercial",
      },
    };
    const res = { json: (params) => params };
    const response = await validCompany(req, res);

    expect(response.message).toEqual('"modalidadeTarifaria" is required');
  });

  test("should be abble return error whe not send historicoDeConsumo", async () => {
    const req = {
      body: {
        numeroDoDocumento: "14041737706",
        tipoDeConexao: "bifasico",
        classeDeConsumo: "comercial",
        modalidadeTarifaria: "convencional",
      },
    };
    const res = {
      json: (data) => data,
    };
    const response = await validCompany(req, res);

    expect(response.message).toEqual('"historicoDeConsumo" is required');
  });

  test("should be abble elegivél bifasico méedia consumo = 399", async () => {
    const req = {
      body: {
        numeroDoDocumento: "14041737706",
        tipoDeConexao: "bifasico",
        classeDeConsumo: "comercial",
        modalidadeTarifaria: "convencional",
        historicoDeConsumo: [
          3878, // mes atual
          9760, // mes anterior
          5976, // 2 meses atras
          2797, // 3 meses atras
          2481, // 4 meses atras
          5731, // 5 meses atras
          7538, // 6 meses atras
          4392, // 7 meses atras
          7859, // 8 meses atras
          4160, // 9 meses atras
          6941, // 10 meses atras
          4597, // 11 meses atras
        ],
      },
    };
    const res = {
      json: (params) => {
        return params;
      },
    };
    const response = await validCompany(req, res);

    expect(response.elegivel).toBeTruthy();
  });

  test("should be abble not elegivél bifasico com consumo = 399", async () => {
    const req = {
      body: {
        numeroDoDocumento: "14041737706",
        tipoDeConexao: "bifasico",
        classeDeConsumo: "comercial",
        modalidadeTarifaria: "convencional",
        historicoDeConsumo: [
          399, // mes atual
          399, // mes anterior
          399, // 2 meses atras
          399, // 3 meses atras
          399, // 4 meses atras
          399, // 5 meses atras
          399, // 6 meses atras
          399, // 7 meses atras
          399, // 8 meses atras
          399, // 9 meses atras
          399, // 10 meses atras
          399, // 11 meses atras
        ],
      },
    };
    const res = {
      json: (params) => {
        return params;
      },
    };
    const response = await validCompany(req, res);

    expect(response.elegivel).toBeFalsy();
  });

  test("should be abble elegivél monofasico", async () => {
    const req = {
      body: {
        numeroDoDocumento: "14041737706",
        tipoDeConexao: "monofasico",
        classeDeConsumo: "comercial",
        modalidadeTarifaria: "convencional",
        historicoDeConsumo: [
          3878, // mes atual
          9760, // mes anterior
          5976, // 2 meses atras
          2797, // 3 meses atras
          2481, // 4 meses atras
          5731, // 5 meses atras
          7538, // 6 meses atras
          4392, // 7 meses atras
          7859, // 8 meses atras
          4160, // 9 meses atras
          6941, // 10 meses atras
          4597, // 11 meses atras
        ],
      },
    };
    const res = {
      json: (params) => {
        return params;
      },
    };
    const response = await validCompany(req, res);

    expect(response.elegivel).toBeTruthy();
  });

  test("should be abble not elegivél monofasico média de consumo = 499", async () => {
    const req = {
      body: {
        numeroDoDocumento: "14041737706",
        tipoDeConexao: "monofasico",
        classeDeConsumo: "comercial",
        modalidadeTarifaria: "convencional",
        historicoDeConsumo: [
          399, // mes atual
          399, // mes anterior
          399, // 2 meses atras
          399, // 3 meses atras
          399, // 4 meses atras
          399, // 5 meses atras
          399, // 6 meses atras
          399, // 7 meses atras
          399, // 8 meses atras
          399, // 9 meses atras
          399, // 10 meses atras
          399, // 11 meses atras
        ],
      },
    };
    const res = {
      json: (params) => {
        return params;
      },
    };
    const response = await validCompany(req, res);

    expect(response.elegivel).toBeFalsy();
  });

  test("should be abble elegivél Trifásica", async () => {
    const req = {
      body: {
        numeroDoDocumento: "14041737706",
        tipoDeConexao: "trifasico",
        classeDeConsumo: "comercial",
        modalidadeTarifaria: "convencional",
        historicoDeConsumo: [
          3878, // mes atual
          9760, // mes anterior
          5976, // 2 meses atras
          2797, // 3 meses atras
          2481, // 4 meses atras
          5731, // 5 meses atras
          7538, // 6 meses atras
          4392, // 7 meses atras
          7859, // 8 meses atras
          4160, // 9 meses atras
          6941, // 10 meses atras
          4597, // 11 meses atras
        ],
      },
    };
    const res = {
      json: (params) => {
        return params;
      },
    };
    const response = await validCompany(req, res);

    expect(response.elegivel).toBeTruthy();
  });

  test("should be abble não elegivél Trifásica com média de consumo baixa", async () => {
    const req = {
      body: {
        numeroDoDocumento: "14041737706",
        tipoDeConexao: "trifasico",
        classeDeConsumo: "comercial",
        modalidadeTarifaria: "convencional",
        historicoDeConsumo: [
          699, // mes atual
          699, // mes anterior
          699, // 2 meses atras
          699, // 3 meses atras
          699, // 4 meses atras
          699, // 5 meses atras
          699, // 6 meses atras
          699, // 7 meses atras
          699, // 8 meses atras
          699, // 9 meses atras
          699, // 10 meses atras
          699, // 11 meses atras
        ],
      },
    };
    const res = {
      json: (params) => {
        return params;
      },
    };
    const response = await validCompany(req, res);

    expect(response.elegivel).toBeFalsy();
  });

  test("should be abble não elegivél classe de consumo poderPublico", async () => {
    const req = {
      body: {
        numeroDoDocumento: "14041737706",
        tipoDeConexao: "trifasico",
        classeDeConsumo: "poderPublico",
        modalidadeTarifaria: "convencional",
        historicoDeConsumo: [
          3878, // mes atual
          9760, // mes anterior
          5976, // 2 meses atras
          2797, // 3 meses atras
          2481, // 4 meses atras
          5731, // 5 meses atras
          7538, // 6 meses atras
          4392, // 7 meses atras
          7859, // 8 meses atras
          4160, // 9 meses atras
          6941, // 10 meses atras
          4597, // 11 meses atras
        ],
      },
    };
    const res = {
      json: (params) => {
        return params;
      },
    };
    const response = await validCompany(req, res);

    expect(response.elegivel).toBeFalsy();
    expect(response.razoesDeInelegibilidade).toEqual([
      "Classe de consumo não aceita",
    ]);
  });

  test("should be abble não elegivél classe de consumo rural", async () => {
    const req = {
      body: {
        numeroDoDocumento: "14041737706",
        tipoDeConexao: "trifasico",
        classeDeConsumo: "rural",
        modalidadeTarifaria: "convencional",
        historicoDeConsumo: [
          3878, // mes atual
          9760, // mes anterior
          5976, // 2 meses atras
          2797, // 3 meses atras
          2481, // 4 meses atras
          5731, // 5 meses atras
          7538, // 6 meses atras
          4392, // 7 meses atras
          7859, // 8 meses atras
          4160, // 9 meses atras
          6941, // 10 meses atras
          4597, // 11 meses atras
        ],
      },
    };
    const res = {
      json: (params) => {
        return params;
      },
    };
    const response = await validCompany(req, res);

    expect(response.elegivel).toBeFalsy();
    expect(response.razoesDeInelegibilidade).toEqual([
      "Classe de consumo não aceita",
    ]);
  });

  test("should be abble não elegivél classe de consumo rural", async () => {
    const req = {
      body: {
        numeroDoDocumento: "14041737706",
        tipoDeConexao: "trifasico",
        classeDeConsumo: "rural",
        modalidadeTarifaria: "convencional",
        historicoDeConsumo: [
          3878, // mes atual
          9760, // mes anterior
          5976, // 2 meses atras
          2797, // 3 meses atras
          2481, // 4 meses atras
          5731, // 5 meses atras
          7538, // 6 meses atras
          4392, // 7 meses atras
          7859, // 8 meses atras
          4160, // 9 meses atras
          6941, // 10 meses atras
          4597, // 11 meses atras
        ],
      },
    };
    const res = {
      json: (params) => {
        return params;
      },
    };
    const response = await validCompany(req, res);

    expect(response.elegivel).toBeFalsy();
    expect(response.razoesDeInelegibilidade).toEqual([
      "Classe de consumo não aceita",
    ]);
  });
  test("should be abble não elegivél modalidade não aceita", async () => {
    const req = {
      body: {
        numeroDoDocumento: "14041737706",
        tipoDeConexao: "trifasico",
        classeDeConsumo: "comercial",
        modalidadeTarifaria: "azul",
        historicoDeConsumo: [
          3878, // mes atual
          9760, // mes anterior
          5976, // 2 meses atras
          2797, // 3 meses atras
          2481, // 4 meses atras
          5731, // 5 meses atras
          7538, // 6 meses atras
          4392, // 7 meses atras
          7859, // 8 meses atras
          4160, // 9 meses atras
          6941, // 10 meses atras
          4597, // 11 meses atras
        ],
      },
    };
    const res = {
      json: (params) => {
        return params;
      },
    };
    const response = await validCompany(req, res);

    expect(response.elegivel).toBeFalsy();
    expect(response.razoesDeInelegibilidade).toEqual([
      "Modalidade tarifária não aceita",
    ]);
  });
});
