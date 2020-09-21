const frisby = require('frisby');

const url = 'http://localhost:3000';

describe('', () => {
  beforeEach(() => { 
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
  });

  afterEach(() => {
    shell.exec('npx sequelize-cli db:drop');
  });


  /*

  5 - Sua aplicação deve ter o endpoint GET `/user/:id`
  
- Retorna os detalhes do usuário baseado no `id` da rota. Os dados devem ter o seguinte formato:
  ```json
  {
    "id": "401465483996",
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```
- A requisição deve ter token de autenticação nos headers e, caso contrário, retorne um código de `status 401`.
  */

  it('Sua aplicação deve ter o endpoint GET `/user/:id', async () => {
    await frisby
      .get(`${url}/user/1`)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        result = JSON.parse(body);
        expect(result.id).toBe(1);
        expect(result.displayName).toBe('Lewis Hamilton');
        expect(result.email).toBe('lewishamilton@gmail.com');
        expect(result.image).toBe('https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg');
      });
  });
});
