const { promisify } = require('util');
const { readFile } = require("fs").promises;
const { resolve } = require("path");

const exec = promisify(require('child_process').exec);

let testResults;

beforeAll(async () =>{
  try {
    await exec(`npm run dev:test:coverage:json &> /dev/null`);
    
    const path = resolve("coverage", "coverage-summary.json");
    
    const lines = await readFile(path, "utf-8")
      .then((coverageTxt) => JSON.parse(coverageTxt))
      .then(({ total: { lines } }) => lines );
  
    testResults = {
      path,
      lines,
    };
  } catch (error) {
    throw new Error(`Não foi possível fazer a leitura da cobertura\n${error.message}`);
  }
});

afterAll(async () => {
  await exec('rm -rf coverage .nyc_output');
});

describe('14 - Crie testes de integração que cubram no mínimo 30 porcento dos arquivos em src com um mínimo de 50 linhas cobertas', () => {
  it('Será validado que o teste cobre o valor esperado', async () =>{
    expect(testResults.lines.skipped).toStrictEqual(0);
    expect(testResults.lines.pct).toBeGreaterThanOrEqual(30);
    expect(testResults.lines.covered).toBeGreaterThanOrEqual(50);
  });
});
