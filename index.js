const express = require('express');

const app = express();

const test = () =>  1
const test1 = () => 1


app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/', (request, response) => {
  response.send();
});
