# Boas vindas ao projeto Freelancers API!

Você já usa o GitHub diariamente para desenvolver os exercícios, certo? Agora, para desenvolver os projetos, você deverá seguir as instruções a seguir. Fique atento a cada passo, e se tiver qualquer dúvida, nos envie por Slack! #vqv 🚀

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir deste repositório, utilizando uma branch específica e um Pull Request para colocar seus códigos.

---

## O que deverá ser desenvolvido

Você vai arquiteturar e desenvolver uma API com um banco de dados, que pode ser SQL ou NoSQL, para uma plataforma de Freelancers.

---

## Desenvolvimento

Começando pela API, você vai desenvolver alguns endpoints (seguindo os principios do REST) que estarão conectados ao seu banco de dados. 

---

## Requisitos do projeto

#### Endpoints

### 1 - A URL base da API deve ser `localhost:3000` para todos os endpoints

A API deve ser iniciada com o comando `node api` a partir da raiz da aplicação.

### 2 - O endpoint `/login` deve receber uma requisição do tipo `POST`. O corpo da request deve conter um e-mail e uma senha válidos

Um email será considerado válido se tiver o formato `<prefixo>@<domínio>`.

A senha deverá conter 6 caracteres, todos números.

O corpo da requisição deverá seguir o formato abaixo:

```json
{
  "email": "email@mail.com",
  "password": "135982"
}
```

### 3 - Caso algum desses campos seja inválido, retorne um código de status 400 com o corpo `{ message: "Campos inválidos" }`.

### 4 - Caso esteja tudo certo com o login, a resposta deve ser um token de 16 caracteres, contendo letras e números aleatórios

A resposta da requisição deve ter o seguinte formato:

```json
{
  "token": "token-aqui"
}
```

### 5 Os endpoints de _Jobs_ devem ser os seguintes

**Todos os endpoints marcado com * devem receber um token de autenticação nos headers, caso contrario, retornar um 401.**

```javascript
-- POST* /job - cria um novo job
-- GET /jobs - lista todos os jobs disponiveis
-- POST* /job/:id/apply - aplica pra um job, deve receber o token do usuario nos headers para saber quem está aplicando.
-- GET job/:id - mostra os detalhes de um job especifico 
-- DELETE* job/:id - deleta um job especifico, somente quem criou o job pode deleta-lo. 
```

### 6 Os endpoints de _User_ devem ser os seguinte:

```javascript
-- GET /users - lista todos os usuarios disponiveis
-- POST /user - cria um novo usuário (signup), recebendo todos os atributos de um _user_ no corpo da requisição
-- GET /user/:id - mostra os detalhes de um usuário especifico
-- DELETE* /user/:id - deleta um usuário especifico, somente o próprio usuário pode deleta-lo. 
```

### 7 Os modelos devem seguir a seguinte especificação:

```javascript
// user
{
    name,
    email,
    phone,
    description,
    hourlyPrice,
    skills: ['Java', 'Spring MVC', 'MySQL']
}
```

```javascript
// model
{
    title,
    description,
    skills,
    budget
}
```
---

## Instruções para entregar seu projeto:

### ANTES DE COMEÇAR A DESENVOLVER:

1. Clone o repositório
  - `git clone git@github.com:tryber/sd-01-block29-crypto-index-starter.git`.
  - Entre na pasta do repositório que você acabou de clonar:
    - `cd sd-01-block29-crypto-index-starter`

2. Instale as dependências
  - `npm install`

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
  - Vá até a página de _Pull Requests_ do [repositório no GitHub](https://github.com/tryber/crypto-index-starter/pulls)
  - Clique no botão verde _"New pull request"_
  - Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
  - Clique no botão verde _"Create pull request"_
  - Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
  - **Não se preocupe em preencher mais nada por enquanto!**
  - Volte até a [página de _Pull Requests_ do repositório](https://github.com/tryber/crypto-index-starter/pulls) e confira que o seu _Pull Request_ está criado

---

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
