### O que devo desenvolver?

- Começando pela API, vamos desenvolver alguns endpoints conectando APIs externas e arquivos .json locais do projeto.

- A API externa que vamos utilizar é a da **CoinDesk**. A [documentação está disponível aqui](https://www.coindesk.com/coindesk-api).

### Antes de começar:

- Clone o starter do projeto: ``git clone https://github.com/betrybe/crypto-index-starter``

- No starter temos o SSR e os testes já configurados.

- Rode os testes da API: ``yarn test:api``. Todos os testes devem quebrar antes de você começar a codificar.

#### Endpoints

- A URL base deve ser ``localhost:3001`` para todos os endpoints.

- `/login` deve receber uma requisição do tipo POST. O corpo da request deve contar um e-mail válido e uma senha de 6 dígitos contendo apenas números:

- A resposta do login deve ser um token de 16 caracteres contendo letras e números aleatórios.

```json
// request
{
  "email": "email@mail.com",
  "password": "135982"
}

// response
{
  "token": "token-aqui"
}
```

- Caso algum desses campos esteja inválido, retornar um código 400 com o corpo ```{ message: "Campos inválidos" }```

- ``/crypto/btc`` deve receber uma requisição do tipo GET e retornar o mesmo objeto retornado pela url `https://api.coindesk.com/v1/bpi/currentprice/BTC.json`, com a única diferença que vamos adicionar algumas chaves na resposta.

- Nesse endpoint, vamos adicionar a chave ``BRL``, ``EUR`` e ``CAD``. O valor das chaves `rate` e `rate_float` devem vir do JSON `currencies.json` (e respeitar a tipagem `string` e `float`), onde usamos o valor do dólar para calcular o das outras moedas.

```json
// currencies.json
{
  "BRL": "5.400",
  "EUR": "0.920",
  "CAD": "1.440"
}
```

- O calculo é simples: 1 dólar = 5,40 reais, ou seja, na cotação atual, um BTC vale 35,136.02718 reais. Lembrando que os retornos da API são no padrão americano.

- Exemplo de retorno:

```json
{
   "time":{
      "updated":"Mar 22, 2020 23:54:00 UTC",
      "updatedISO":"2020-03-22T23:54:00+00:00",
      "updateduk":"Mar 22, 2020 at 23:54 GMT"
   },
   "disclaimer":"This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org",
   "bpi":{
      "USD":{
         "code":"USD",
         "rate":"6,506.6717",
         "description":"United States Dollar",
         "rate_float":6506.6717
      },
      "BRL": {
        "code": "BRL",
        "rate": "# Valor calculado do arquivo .json local",
        "description":  "Brazilian Real",
        "rate_float": "# Valor calculado do arquivo .json local"
      },
      // Adicionar chave EUR,
      // Adicionar chave CAD
      "BTC":{
         "code":"BTC",
         "rate":"1.0000",
         "description":"Bitcoin",
         "rate_float":1
      }
   }
}
```

- ``/crypto/btc`` deve receber uma requisição do tipo POST com o valor do BTC, que deve ser adicionado ao arquivo `currencies.json`. O corpo da request tem o seguinte modelo:

```json
// request
{
  "value": 10000.0000
}
// response
{
  "message": "Valor alterado com sucesso!"
}
```

E o arquivo ``currencies.json``

```json
// currencies.json
{
  "BRL": "5.4000",
  "EUR": "0.9200",
  "CAD": "1.4400",
  "BTC": "10000.0000"
}
```

- Caso o valor passado seja ``0``, remover a chave `BTC` do arquivo ``currencies.json``.

- Caso nenhum corpo seja passado, retornar um código 400 com a corpo ```{ message: "Valor inválido" }```

- Caso o arquivo ```currencies.json``` tenha o valor do BTC, a chave `rate` e `rate_float` dentro da chave `USD` no mesmo endpoint (ao receber um GET request) deve mudar, consequentemente, todos os outros tambem.

- Esse endpoint deve conter no cabeçalho a seguinte chave ```Authorization: ${token vindo da api de login}```. Caso esse token não esteja disponível, retornar um erro 401 com o corpo:

```json
{
  "message": "Token inválido"
}
```

- Caso um endpoint não exista, retornar um código 404 com o seguinte corpo:

```json
{
  "message": "Endpoint não encontrado"
}
```
⚠️ Atenção para a **cobertura de testes**! É importante que cada funcionalidade desenvolvida na API tenha testes unitários para garantir uma boa cobertura de testes do projeto.

### Front-end

- A URL base deve ser ``localhost:3000`` para o front.

- Nosso front-end deve ser construido usando React e sendo renderizado no servidor (SSR).

- Teremos basicamente 2 páginas:

- **Login**: Apenas um formulário de e-mail e senha que chama o endpoint de ``/login`` e salva o token em `localStorage`.

- **Home**: Onde podemos ver os preços das moedas comparadas com o valor de 1 BitCoin (vindo do endpoint ``/crypto/btc``).
Ao alterar o valor no input `BTC` e tirar o foco do campo, o endpoint de alteração de valor deve ser chamado e os valores atualizados.

Você pode acessar um protótipo no link abaixo:

https://www.figma.com/file/J2AicAJZNUoRf4C8TLp8Jh/Untitled?node-id=0%3A1

Para ver os comentários sobre cada componente, basta clickar no icone de comentários no Figma (lado esquerdo superior).

![image](https://res.cloudinary.com/drdpedroso/image/upload/c_scale,w_400/v1575815877/Screenshot_2019-12-08_at_11.37.25_kzt7rl.png)

A **cobertura de testes no Front-end** entra como um bônus :)
