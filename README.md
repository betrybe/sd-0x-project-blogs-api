# Boas vindas ao projeto TryBlog API!

Você já usa o GitHub diariamente para desenvolver os exercícios, certo? Agora, para desenvolver os projetos, você deverá seguir as instruções a seguir. Fique atento a cada passo, e se tiver qualquer dúvida, nos envie por Slack! #vqv 🚀

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir deste repositório, utilizando uma branch específica e um Pull Request para colocar seus códigos.

---

## O que deverá ser desenvolvido

Você vai arquiteturar, desenvolver e testar uma API com um banco de dados (com ORM), que pode ser SQL ou NoSQL, para um Blog.

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

### 5 Os endpoints de _BlogPosts_ devem ser os seguintes

**Todos os endpoints marcado com * devem receber um token de autenticação nos headers, caso contrario, retornar um 401.**

#### 5.1 POST* /post
Deve receber um __BlogPost__ no corpo da requisição e cria-lo no banco.

Caso o post não contenha todas as informações necessárias (todos os campos de __BlogPost__ são obrigátorios), retornar um 500.

#### 5.2 GET /posts
Deve listar todos os __BlogPosts__ e retorna-los na seguinte estrutura:

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
      },
      "comments": {
        "totalItems": "1", // o total de comentários dentro da chave `items`
        "items": [
          {
            "author": "John Smith",
            "text": "Awesome blog post! Loved it",
            "published": "2011-08-01T19:58:00.000Z"
          } 
        ]
      }
    }
]
```

#### 5.3 POST* /post/:id
Deve receber um __BlogPost__ que ira sobreescrever o original com o ID especificado na URL. Só deve ser permitido para o usuário que criou o __BlogPost__.

Caso uma pessoa diferente ou uma requisição sem token tente deleta-lo, retornar um 401.

Caso o post não contenha todas as informações necessárias (todos os campos de __BlogPost__ são obrigátorios), retornar um 500.

#### 5.4 GET post/:id
Retorna um __BlogPost__ como id especificado.

#### 5.5 GET posts/search?q=:searchTerm
Retorna um __BlogPost__ que contenha o termo pesquisado no ``queryParam`` da URL dentro da chave `content`.

Caso nenhum __BlogPost__ satisfaça a busca, retornar um array vazio.

#### 5.6 DELETE* post/:id
Deleta o recurso. Só deve ser permitido para o usuário que criou o __BlogPost__.

Caso uma pessoa diferente ou uma requisição sem token tente deleta-lo, retornar um 401.

### 6 Os endpoints de _Comments_ devem ser os seguinte:

#### 6.1 POST /post/:id/comment
Deve receber um __Comment__ no corpo da requisição e adiciona-lo na estrutura de comments dentro do __BlogPost__ com o ID pasado na URL.

Caso esse endpoint receba um token, o `author` deve ser a pessoa dona do token. Caso nenhum token for passado, o `author` deve ser `null` (comentário anonimo) 

#### 6.2 DELETE* post/:id/comment/:commentId
Deleta o recurso. Só deve ser permitido para o usuário que criou o __BlogPost__ ou o usuário que criou o __Comment__.

Caso uma pessoa diferente ou uma requisição sem token tente deleta-lo, retornar um 401.

### 7 Os endpoints de _User_ devem ser os seguinte:

**Todos os endpoints marcado com * devem receber um token de autenticação nos headers, caso contrario, retornar um 401.**

#### 7.1 GET /users
Deve listar todos os __Users__ e retorna-los na seguinte estrutura:

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
#### 7.2 POST /user
Cria um novo __User__. Deve receber um __User__ no corpo da requisição.

Caso exista uma pessoa com o mesmo e-mail na base, retornar o seguinte erro:

```javascript
{
    message: 'Usuário já existe'
}
```

Caso contrário, retornar a mesma resposta do endpoint de `/login`

#### 7.3 GET /user/:id
Retorna os detalhes do usuário baseado no ID da rota.

#### 7.4 DELETE* /user/:id
Deleta um __User__. Somente o recurso com o mesmo id a ser deletado pode performar essa operação.

Caso uma pessoa diferente ou uma requisição sem token tente deleta-lo, retornar um 401.

### 8 Os modelos devem seguir a seguinte especificação:

* **User**
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

* **BlogPost**
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
  },
  "comments": {
    "totalItems": "1", // o total de comentários dentro da chave `items`
    "items": [
      {
        "author": "John Smith",
        "text": "Awesome blog post! Loved it",
        "published": "2011-08-01T19:58:00.000Z"
      } 
    ]
  }
}
```

* **Comment**
```json
{
    "author": "John Smith",
    "text": "Awesome blog post! Loved it",
    "published": "2011-08-01T19:58:00.000Z"
}
// caso seja anonimo
{
    "author": null,
    "text": "Awesome blog post! Loved it",
    "published": "2011-08-01T19:58:00.000Z"
} 
```

### 9 Status HTTTP:

Todas as respostas devem respeitar os [status do protocolo HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status) com base no que o REST prega.

Alguns exemplos:
```
-- requisições que precisma de token mas não receberam, retornar um 401
-- requisições que não seguem o padrão pedido pelo servidor, retornar 400
-- um problema inesperado no servidor, retornar 500
-- sucesso ao criar um recurso, retornar 201
```

## Bônus

Escrever testes unitários é um padrão para seus projetos, então vamos nos aventurar com **testes de integração usando Supertest** como um bônus para esse módulo.

Além disso, fazer um deploy da sua aplicação também entra como um bônus.  

---

## Instruções para entregar seu projeto:

### ANTES DE COMEÇAR A DESENVOLVER:

1. Clone o repositório
  - `git clone git@github.com:tryber/sd-01-block33-tryblog-api.git`.
  - Entre na pasta do repositório que você acabou de clonar:
    - `cd sd-01-block33-tryblog-api`

2. Instale as dependências
  - `npm install`

3. Crie uma branch a partir da branch `master`
  - Verifique que você está na branch `master`
    - Exemplo: `git branch`
  - Se não estiver, mude para a branch `master`
    - Exemplo: `git checkout master`
  - Agora crie uma branch à qual você vai submeter os `commits` do seu projeto
    - Você deve criar uma branch no seguinte formato: `nome-de-usuario-nome-do-projeto`
    - Exemplo: `git checkout -b joaozinho-tryblog-api`

4. Adicione as mudanças ao _stage_ do Git e faça um `commit`
  - Verifique que as mudanças ainda não estão no _stage_
    - Exemplo: `git status` (deve aparecer listado o arquivo alterado em vermelho)
  - Adicione o arquivo alterado ao _stage_ do Git
    - Exemplo:
      - `git add .` (adicionando todas as mudanças - _que estavam em vermelho_ - ao stage do Git)
      - `git status` (deve aparecer listado o arquivo adicionado em verde)
  - Faça o `commit` inicial
    - Exemplo:
      - `git commit -m 'iniciando o projeto TryBlog'` (fazendo o primeiro commit)
      - `git status` (deve aparecer uma mensagem tipo _nothing to commit_ )

5. Adicione a sua branch com o novo `commit` ao repositório remoto
  - Usando o exemplo anterior: `git push -u origin joaozinho-tryblog-api`

6. Crie um novo `Pull Request` _(PR)_
  - Vá até a página de _Pull Requests_ do [repositório no GitHub](https://github.com/betrybe/tryblog-api/pulls)
  - Clique no botão verde _"New pull request"_
  - Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
  - Clique no botão verde _"Create pull request"_
  - Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
  - **Não se preocupe em preencher mais nada por enquanto!**
  - Volte até a [página de _Pull Requests_ do repositório](https://github.com/betrybe/tryblog-api/pulls) e confira que o seu _Pull Request_ está criado

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
