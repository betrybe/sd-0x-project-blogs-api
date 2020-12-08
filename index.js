const express = require('express');

const app = express();
const testt = [122, 3];
const test = () => testt;
const test1 = () => testt;

console.log(test1 + test);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/', (request, response) => {
  response.send();
});
