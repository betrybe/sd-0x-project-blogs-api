# Boas vindas ao primeiro projeto Crypto Index!

Você já usa o GitHub diariamente para desenvolver os exercícios, certo? Agora, para desenvolver os projetos, você deverá seguir as instruções a seguir. Fique atento a cada passo, e se tiver qualquer dúvida, nos envie por Slack! #vqv 🚀

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir deste repositório, utilizando uma branch específica e um Pull Request para colocar seus códigos.

---

## O que deverá ser desenvolvido

Você irá desenvolver um app full-stack! Isso significa que você vai contruir tanto a API quanto o Front-End (Server Side Rendered :D)!

A aplicação a ser contruída é um "index" para vermos o preço do BitCoin em diferentes moedas (e poder editar ele, é claro).

## Desenvolvimento

Começando pela API, vamos desenvolver alguns endpoints conectando APIs externas e arquivos .json locais do projeto.

A API externa que vamos utilizar é a da **CoinDesk**. A [documentação está disponível aqui](https://www.coindesk.com/coindesk-api).

O nosso front, renderizado no servidor, vai basicamente servir como expositor para a API que vamos criar. São duas telas simples.

Você pode acessar um protótipo no link abaixo:

https://www.figma.com/file/J2AicAJZNUoRf4C8TLp8Jh/Untitled?node-id=0%3A1

## Requisitos do projeto

#### Endpoints

1. A URL base deve ser `localhost:3001` para todos os endpoints.

2. `/login` deve receber uma requisição do tipo `POST`. O corpo da request deve conter um e-mail válido e uma senha de 6 dígitos contendo apenas números:

   ```json
   /* request */
   {
     "email": "email@mail.com",
     "password": "135982"
   }
   ```

3. Caso algum desses campos esteja inválido, retorne um código 400 com o corpo `{ message: "Campos inválidos" }`.

4. Caso esteja tudo certo com o login, a resposta deve ser um token de 16 caracteres contendo letras e números aleatórios:

   ```json
   /* response */
   {
     "token": "token-aqui"
   }
   ```

5. Crie o arquivo `currencies.json`. Esse json servirá como fonte de cotação do cambio.

   `/crypto/btc` deve receber uma requisição do tipo `GET` e retornar o mesmo objeto [retornado](https://api.coindesk.com/v1/bpi/currentprice/BTC.json) pelo endpoint da API coindesk. A únic diferença é que vamos adicionar algumas chaves na resposta.

   Nesse endpoint, vamos adicionar as chaves `BRL`, `EUR` e `CAD`. O valor das chaves `rate` e `rate_float` devem vir do JSON `currencies.json` (e respeitar a tipagem `string` e `float`), ond usamos o valor do dólar para calcular o das outras moedas.

   > currencies.json

   ```json
   {
     "BRL": "5.400",
     "EUR": "0.920",
     "CAD": "1.440"
   }
   ```

   O cálculo:

   - 1 dólar = 5,40 reais;

   - Um BTC é: 5,40 (rate_float de BRL) \* 6,506.6717 (rate_float de USD) = 35,136.02718 reais.

   Lembrando que os retornos da API são no padrão americano.

   **Exemplo de retorno:**

   ```json
   /* Retorno do endpoint `/crypto/btc` */
   {
     "time": {
       "updated": "Mar 22, 2020 23:54:00 UTC",
       "updatedISO": "2020-03-22T23:54:00+00:00",
       "updateduk": "Mar 22, 2020 at 23:54 GMT"
     },
     "disclaimer": "This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org",
     "bpi": {
       "USD": {
         "code": "USD",
         "rate": "6,506.6717",
         "description": "United States Dollar",
         "rate_float": 6506.6717
       },
       "BRL": {
         "code": "BRL",
         "rate": "# Valor calculado do arquivo .json local",
         "description": "Brazilian Real",
         "rate_float": "# Valor calculado do arquivo .json local"
       },
       // Adicionar chave EUR,
       // Adicionar chave CAD
       "BTC": {
         "code": "BTC",
         "rate": "1.0000",
         "description": "Bitcoin",
         "rate_float": 1
       }
     }
   }
   ```

6. `/crypto/btc` deve receber uma requisição do tipo `POST` com o valor do BTC, que deve ser adicionado ao arquivo `currencies.json`. O corpo da request tem o seguinte modelo:

   ```json
   /* request */
   {
     "value": 10000.0
   }
   ```

   O response será da seguinte forma:

   ```json
   /* response */
   {
     "message": "Valor alterado com sucesso!"
   }
   ```

   Arquivo `currencies.json` atualizado com o valor enviado pelo request:

   > currencies.json

   ```json
   {
     "BRL": "5.4000",
     "EUR": "0.9200",
     "CAD": "1.4400",
     "BTC": "10000.0000"
   }
   ```

7. Caso o valor passado seja `0`, remover a chave `BTC` do arquivo `currencies.json`.

8. Caso nenhum corpo seja passado, retornar um código 400 com o corpo (body) `{ message: "Valor inválido" }`.

9. Caso o arquivo `currencies.json` tenha o valor do BTC, a chave `rate` e `rate_float`, dentro da chave `USD`, ao receber um `GET`, no mesmo endpoint, deve mudar, consequentemente, todos os outros também.

10. Esse endpoint deve conter no cabeçalho (header) a chave `Authorization`. A chave deve ser preenchida com o valor do token que foi fornecido ao usuário no login. Ficará da seguinte forma `Authorization: ${TOKEN_DO_LOGIN}`.

    Caso esse token não esteja disponível, retornar um erro 401 com o corpo:

    ```json
    {
      "message": "Token inválido"
    }
    ```

11. Caso um endpoint não exista, retornar um código 404 com o seguinte corpo:

    ```json
    {
      "message": "Endpoint não encontrado"
    }
    ```

⚠️ Atenção para a **cobertura de testes**! É importante que cada funcionalidade desenvolvida na API tenha testes unitários para garantir uma boa cobertura de testes do projeto.

### Front-end

12. A URL base deve ser `localhost:3000` para o Front-end.

13. Nosso Front-end deve ser construído usando React e sendo renderizado no servidor (SSR).

    Teremos, basicamente, duas páginas:

    - **Login**: Apenas um formulário de e-mail e senha que chama o endpoint de `/login` e salva o token em `localStorage`.

    - **Home**: Onde podemos ver os preços das moedas comparadas com o valor de 1 BitCoin (vindo do endpoint `/crypto/btc`).

    Não se esqueça de acessar o [protótipo.](https://www.figma.com/file/J2AicAJZNUoRf4C8TLp8Jh/Untitled?node-id=0%3A1)

    Para ver os comentários sobre cada componente, faça o login no Figma e em seguida basta clickar no ícone de comentários (lado esquerdo superior).

    ![image](https://res.cloudinary.com/drdpedroso/image/upload/c_scale,w_400/v1575815877/Screenshot_2019-12-08_at_11.37.25_kzt7rl.png)

14. Ao alterar o valor no input `BTC` e tirar o foco do campo, o endpoint de alteração de valor deve ser chamado e os valores atualizados.

## BÔNUS

15. Cobertura de testes no Front-end.

### DURANTE O DESENVOLVIMENTO

- Faça `commits` das alterações que você fizer no código regularmente

- Lembre-se de sempre após um (ou alguns) `commits` atualizar o repositório remoto

- Os comandos que você utilizará com mais frequência são:
  1. `git status` _(para verificar o que está em vermelho - fora do stage - e o que está em verde - no stage)_
  2. `git add` _(para adicionar arquivos ao stage do Git)_
  3. `git commit` _(para criar um commit com os arquivos que estão no stage do Git)_
  4. `git push -u nome-da-branch` _(para enviar o commit para o repositório remoto na primeira vez que fizer o `push` de uma nova branch)_
  5. `git push` _(para enviar o commit para o repositório remoto após o passo anterior)_

---

## Instruções para entregar seu projeto:

### ANTES DE COMEÇAR A DESENVOLVER:

1. Clone o repositório

- `git clone git@github.com:betrybe/crypto-index-starter.git`.
- Entre na pasta do repositório que você acabou de clonar:
  - `cd crypto-index-starter`
- Nesse repo temos o SSR e os testes integrados da API já configurados.

2. Instale as dependências

- `yarn install`
- rode os testes da API: `yarn test:api`. Todos os testes devem quebrar antes de você começar a codificar.

3. Crie uma branch a partir da branch `master`

- Verifique que você está na branch `master`
  - Exemplo: `git branch`
- Se não estiver, mude para a branch `master`
  - Exemplo: `git checkout master`
- Agora crie uma branch à qual você vai submeter os `commits` do seu projeto
  - Você deve criar uma branch no seguinte formato: `nome-de-usuario-nome-do-projeto`
  - Exemplo: `git checkout -b joaozinho-crypto-index`

4. Adicione as mudanças ao _stage_ do Git e faça um `commit`

- Verifique que as mudanças ainda não estão no _stage_
  - Exemplo: `git status` (deve aparecer listado o arquivo alterado em vermelho)
- Adicione o arquivo alterado ao _stage_ do Git
  - Exemplo:
    - `git add .` (adicionando todas as mudanças - _que estavam em vermelho_ - ao stage do Git)
    - `git status` (deve aparecer listado o arquivo adicionado em verde)
- Faça o `commit` inicial
  - Exemplo:
    - `git commit -m 'iniciando o projeto Crypto Index'` (fazendo o primeiro commit)
    - `git status` (deve aparecer uma mensagem tipo _nothing to commit_ )

5. Adicione a sua branch com o novo `commit` ao repositório remoto

- Usando o exemplo anterior: `git push -u origin joaozinho-crypto-index`

6. Crie um novo `Pull Request` _(PR)_

- Vá até a página de _Pull Requests_ do [repositório no GitHub](https://github.com/betrybe/crypto-index-starter/pulls)
- Clique no botão verde _"New pull request"_
- Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
- Clique no botão verde _"Create pull request"_
- Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
- **Não se preocupe em preencher mais nada por enquanto!**
- Volte até a [página de _Pull Requests_ do repositório](https://github.com/betrybe/crypto-index-starter/pulls) e confira que o seu _Pull Request_ está criado

---

### DEPOIS DE TERMINAR O DESENVOLVIMENTO

Para **"entregar"** seu projeto, siga os passos a seguir:

- Vá até a página **DO SEU** _Pull Request_, adicione a label de _"code-review"_ e marque seus colegas
  - No menu à direita, clique no _link_ **"Labels"** e escolha a _label_ **code-review**
  - No menu à direita, clique no _link_ **"Assignees"** e escolha **o seu usuário**
  - No menu à direita, clique no _link_ **"Reviewers"** e digite `students`, selecione o time `tryber/students-sd-02`

Se ainda houver alguma dúvida sobre como entregar seu projeto, [aqui tem um video explicativo](https://vimeo.com/362189205).

---

### REVISANDO UM PULL REQUEST

⚠⚠⚠

À medida que você e os outros alunos forem entregando os projetos, vocês serão alertados **via Slack** para também fazer a revisão dos _Pull Requests_ dos seus colegas. Fiquem atentos às mensagens do _"Pull Reminders"_ no _Slack_!

Use o material que você já viu sobre [Code Review](https://course.betrybe.com/real-life-engineer/code-review/) para te ajudar a revisar os projetos que chegaram para você.
