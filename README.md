# Boas vindas ao projeto API de Blog!

Você já usa o GitHub diariamente para desenvolver os exercícios, certo? Agora, para desenvolver o projeto, você deverá seguir as instruções abaixo. Tenha atenção a cada passo e, se tiver qualquer dúvida, nos envie por Slack! #vqv 🚀

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir deste repositório, utilizando uma branch específica e um Pull Request para colocar seus códigos.

---

## O que deverá ser desenvolvido

Você vai arquiteturar, desenvolver e testar uma API de um CRUD posts de blog (com o sequelize). Começando pela API, você vai desenvolver alguns endpoints (seguindo os principios do REST) que estarão conectados ao seu banco de dados. Tudo, é claro, devidamente testado!

---

## Requisitos do projeto

### 1 - Sua aplicação deve ser organizada segundo o _Domain Driven Design_
#### Os seguintes pontos serão avaliados:

- A estrutura esperada para a sua aplicação é similar a essa:
```
└── application
│   └── user
│   │   └── userController.js
│   │   └── blogPostsController.js
└── domain
│   └── user.js
│   └── blogPost.js
└── infrastructure
│   └── database
│   │   └── config
│   │   │   └── config.json
│   │   └── migrations
│   │   │   └── [timestamp]-create-user-table.js
│   │   │   └── ...
│   │   └── models
│   │   │   ├── index.js
│   │   │   └── User.js
│   │   │   └── BlogPost.js
│   └── user
│   │   ├── UserMapper.js
│   │   └── UserRepository.js
│   │   ├── BlogPostMapper.js
│   │   └── BlogPostRepository.js
```
- A URL base da API deve ser `localhost:3000` para todos os endpoints. A API deve ser iniciada com o comando `node api` a partir da raiz da aplicação.

### 2 - POST `/login`.
#### Os seguintes pontos serão avaliados:

- Um email será considerado válido se tiver o formato `<prefixo>@<domínio>`. Ele é obrigatório.
- A senha deverá conter 6 caracteres, todos números. Ela é obrigatória.
- O corpo da requisição deverá seguir o formato abaixo:

```json
{
  "email": "email@mail.com",
  "password": "135982"
}
```
- Caso algum desses campos seja inválido, retorne um código de status 400 com o corpo `{ message: "Campos inválidos" }`.
- Caso esteja tudo certo com o login, a resposta deve ser um token de 16 caracteres, contendo letras e números aleatórios, no seguinte formato:

```json
{
  "token": "token-aqui"
}
```

Use JWT para a token.

### 3 - Sua aplicação deve ser o endpoint POST /post
#### Os seguintes pontos serão avaliados:

- Esse endpoint deve receber um _BlogPost_ no corpo da requisição e cria-lo no banco. O corpo da requisição deve ter a seguinte estrutura:

```json
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key"
}
```
- Caso o post não contenha o `title` e/ou o `content` a API deve retornar um erro de status 500.
- A requisição deve ter token de autenticação nos headers e, caso contrario, retornar um 401.

### 4 - GET /posts
#### Os seguintes pontos serão avaliados:

Esse endpoint deve listar todos os _BlogPosts_ e retorna-los na seguinte estrutura:

```json
[
    {
      "id": "7706273476706534553",
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.947Z",
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key",
      "user": { // esse usuário é o autor do post
        "id": "401465483996",
        "displayName": "Brett Wiltshire",
        "email": "brett@email.com",
        "image": {
          "url": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
         }
      }
    }
]
```

### 5 - POST /post/:id
#### Os seguintes pontos serão avaliados:

- O endpoint deve receber um **BlogPost** que ira sobreescrever o original com o ID especificado na URL. Só deve ser permitido para o usuário que criou o **BlogPost**.
- O corpo da requisição deve ter a seguinte estrutura:

```json
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key"
}
```
- Caso uma pessoa diferente de quem criou ou caso uma requisição sem token seja recebida, deve-se retornar um 401.
- Caso o post não contenha o `title` e/ou o `content` a API deve retornar um erro de status 500.
- A requisição deve ter token de autenticação nos headers e, caso contrario, retornar um 401.

### 6 - GET post/:id
#### Os seguintes pontos serão avaliados:

Retorna um **BlogPost** como id especificado. O retorno deve ter os seguinte formato:

```json
{
  "id": "7706273476706534553",
  "published": "2011-08-01T19:58:00.000Z",
  "updated": "2011-08-01T19:58:51.947Z",
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "user": { // esse usuário é o autor do post
    "id": "401465483996",
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "image": {
      "url": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
     }
  }
}
```

### 7 - GET posts/search?q=:searchTerm
#### Os seguintes pontos serão avaliados:

- Retorna uma array de **BlogPosts** que contenham em seu título ou conteúdo o termo pesquisado no ``queryParam`` da URL. O retorno deve ter o seguinte formato:
```json
[
    {
      "id": "7706273476706534553",
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.947Z",
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key",
      "user": { // esse usuário é o autor do post
        "id": "401465483996",
        "displayName": "Brett Wiltshire",
        "email": "brett@email.com",
        "image": {
          "url": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
         }
      }
    }
]
```
- Caso nenhum **BlogPost** satisfaça a busca, retornar um array vazio.

### 8 - DELETE post/:id
#### Os seguintes pontos serão avaliados:

- Deleta o post com o id especificado. Só deve ser permitido para o usuário que criou o **BlogPost**.
- Caso uma pessoa diferente ou uma requisição sem token tente deleta-lo, deve-se retornar um 401.
- Caso o post referido não exista, deve-se retornar um 404.

### 9 - O seu controller de BlogPosts deve ser testado num arquivo `BlogPostController.test.js`
#### Os seguintes pontos serão avaliados:

- O adereçamento dos requisitos do controller deve ser garantido em seus testes.
- Se qualquer uma das funções do seu controller tiver o conteúdo apagado os seus testes devem quebrar.
- Se qualquer uma das strings de seu controller for apagada seus testes devem quebrar

### 10 - O seu mapper e repository de BlogPosts devem ser testados num arquivo `BlogPostMapper.test.js` e `BlogPostRepository.test.js`
#### Os seguintes pontos serão avaliados:

- O adereçamento dos requisitos do seu mapper e repository deve ser garantido em seus testes.
- Se qualquer uma das funções do seu controller tiver o conteúdo apagado os seus testes devem quebrar.
- Se qualquer uma das strings de seu controller for apagada seus testes devem quebrar

### 11 - GET /users
#### Os seguintes pontos serão avaliados:

Deve listar todos os **Users** e retorna-los na seguinte estrutura:

```json
[
  {
    "id": "401465483996",
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "image": {
      "url": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
     }
  }
]
```
- A requisição deve ter token de autenticação nos headers e, caso contrario, retornar um 401.

### 12 - POST /user
#### Os seguintes pontos serão avaliados:

- Cria um novo **User**. Deve receber um **User** no corpo da requisição.
- Caso exista uma pessoa com o mesmo e-mail na base, deve-se retornar o seguinte erro:

```javascript
{
    message: 'Usuário já existe'
}
```

Caso contrário, retornar a mesma resposta do endpoint de `/login`,  um token de 16 caracteres, contendo letras e números aleatórios, no seguinte formato:

```json
{
  "token": "token-aqui"
}
```

### 13 - GET /user/:id
#### Os seguintes pontos serão avaliados:

- Retorna os detalhes do usuário baseado no ID da rota. Os dados devem ter o seguinte formato:
```json
  {
    "id": "401465483996",
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "image": {
      "url": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
     }
  }
```

### 14 - DELETE /user/:id
#### Os seguintes pontos serão avaliados:

- Deleta um **User**. Somente o recurso com o mesmo id a ser deletado pode performar essa operação.
- Caso uma pessoa diferente ou uma requisição sem token tente deleta-lo, deve-se retornar um 401.

### 15 - O seu controller de User deve ser testado num arquivo `UserController.test.js`
#### Os seguintes pontos serão avaliados:

- O adereçamento dos requisitos do controller deve ser garantido em seus testes.
- Se qualquer uma das funções do seu controller tiver o conteúdo apagado os seus testes devem quebrar.
- Se qualquer uma das strings de seu controller for apagada seus testes devem quebrar

### 16 - O seu mapper e repository de User devem ser testados num arquivo `BlogPostMapper.test.js` e `BlogPostRepository.test.js`, respectivamente
#### Os seguintes pontos serão avaliados:

- O adereçamento dos requisitos do seu mapper e repository deve ser garantido em seus testes.
- Se qualquer uma das funções do seu controller tiver o conteúdo apagado os seus testes devem quebrar.
- Se qualquer uma das strings de seu controller for apagada seus testes devem quebrar

### 17 - Os modelos dos seus dados no banco devem seguir a seguinte especificação:
#### Os seguintes pontos serão avaliados:

- O seu projeto deverá usar um `ORM` para criar e atualizar o seu banco. A clonagem do projeto seguida de um comando de migrate deve deixá-lo em sua forma esperada.
- Tabela **User**
```json
{
    "id": "401465483996",
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "image": {
    "url": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}
```
- Tabela **BlogPost**
```json
{
  "id": "7706273476706534553",
  "published": "2011-08-01T19:58:00.000Z",
  "updated": "2011-08-01T19:58:51.947Z",
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "user_id": "401465483996" // esse usuário é o autor do post
}
```

### 18 - Os seus modelos de BlogPosts e e User devem ser testados em arquivos de nome `BlogPostsModel.test.js` e `UserModel.test.js`, respectivamente
#### Os seguintes pontos serão avaliados:

- O adereçamento dos requisitos dos modelos deve ser garantido em seus testes.
- Se qualquer uma das funções de seus modelos tiver o conteúdo apagado, os seus respectivos testes devem quebrar.
- Se qualquer uma das strings de seus modelos for apagada, os seus respectivos testes devem quebrar.

## Dicas
### Status HTTP

Tenha em mente que toodas as respostas devem respeitar os [status do protocolo HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status) com base no que o REST prega.

Alguns exemplos:

- Requisições que precisma de token mas não receberam devem retornar um 401
- Requisições que não seguem o formato pedido pelo servidor devem retornar 400
- Um problema inesperado no servidor deve retornar 500
- Um acesso ao criar um recurso (usuário ou post, no nosso caso) deve retornar 201

### Testes

- Siga as boas práticas para a organização de testes conforme viu no conteúdo! Caso contrário, você se perderá com facilidade!
- Dê preferência por testes unitários nesse projeto.

---

## Instruções para entregar seu projeto:

### ANTES DE COMEÇAR A DESENVOLVER:

1. Clone o repositório
  - `git clone git@github.com:tryber/sd-0x-project-blogs-api.git`.
  - Entre na pasta do repositório que você acabou de clonar:
    - `cd sd-0x-project-blogs-api`

2. Instale as dependências
  - `npm install`

3. Crie uma branch a partir da branch `master`
  - Verifique que você está na branch `master`
    - Exemplo: `git branch`
  - Se não estiver, mude para a branch `master`
    - Exemplo: `git checkout master`
  - Agora crie uma branch à qual você vai submeter os `commits` do seu projeto
    - Você deve criar uma branch no seguinte formato: `nome-de-usuario-nome-do-projeto`
    - Exemplo: `git checkout -b joaozinho-blogs-api`

4. Adicione as mudanças ao _stage_ do Git e faça um `commit`
  - Verifique que as mudanças ainda não estão no _stage_
    - Exemplo: `git status` (deve aparecer listado o arquivo alterado em vermelho)
  - Adicione o arquivo alterado ao _stage_ do Git
    - Exemplo:
      - `git add .` (adicionando todas as mudanças - _que estavam em vermelho_ - ao stage do Git)
      - `git status` (deve aparecer listado o arquivo adicionado em verde)
  - Faça o `commit` inicial
    - Exemplo:
      - `git commit -m 'iniciando o projeto API do Blogs'` (fazendo o primeiro commit)
      - `git status` (deve aparecer uma mensagem tipo _nothing to commit_ )

5. Adicione a sua branch com o novo `commit` ao repositório remoto
  - Usando o exemplo anterior: `git push -u origin joaozinho-blogs-api`

6. Crie um novo `Pull Request` _(PR)_
  - Vá até a página de _Pull Requests_ do [repositório no GitHub](https://github.com/tryber/sd-0x-project-blogs-api/pulls)
  - Clique no botão verde _"New pull request"_
  - Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
  - Clique no botão verde _"Create pull request"_
  - Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
  - **Não se preocupe em preencher mais nada por enquanto!**
  - Volte até a [página de _Pull Requests_ do repositório](https://github.com/tryber/sd-0x-project-blogs-api/pulls) e confira que o seu _Pull Request_ está criado

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

### DEPOIS DE TERMINAR O DESENVOLVIMENTO (OPCIONAL)

Para **"entregar"** seu projeto, siga os passos a seguir:

- Vá até a página **DO SEU** _Pull Request_, adicione a label de _"code-review"_ e marque seus colegas
  - No menu à direita, clique no _link_ **"Labels"** e escolha a _label_ **code-review**
  - No menu à direita, clique no _link_ **"Assignees"** e escolha **o seu usuário**
  - No menu à direita, clique no _link_ **"Reviewers"** e digite `students`, selecione o time `tryber/students-sd-0x`

Se ainda houver alguma dúvida sobre como entregar seu projeto, [aqui tem um video explicativo](https://vimeo.com/362189205).

---

### REVISANDO UM PULL REQUEST

⚠⚠⚠

À medida que você e os outros alunos forem entregando os projetos, vocês serão alertados **via Slack** para também fazer a revisão dos _Pull Requests_ dos seus colegas. Fiquem atentos às mensagens do _"Pull Reminders"_ no _Slack_!

Use o material que você já viu sobre [Code Review](https://course.betrybe.com/real-life-engineer/code-review/) para te ajudar a revisar os projetos que chegaram para você.
