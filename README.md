# Node Express API with MongoDB - Customers

## Descrição
Este projeto é uma API RESTful construída com Node.js, Express e MongoDB para gerenciar informações de clientes.

## Funcionalidades
- Criar um novo cliente
- Listar todos os clientes
- Buscar um cliente por ID
- Atualizar informações de um cliente
- Deletar um cliente

## Tecnologias Utilizadas
- Node.js
- Express
- MongoDB
- Mongoose

## Instalação
1. Clone o repositório:
  ```bash
  git clone https://github.com/seu-usuario/node-express-api-mongodb-customers.git
  ```
2. Navegue até o diretório do projeto:
  ```bash
  cd node-express-api-mongodb-customers
  ```
3. Instale as dependências:
  ```bash
  npm install
  ```

## Configuração
1. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
  ```
  PORT=3000
  MONGODB_URI=sua-string-de-conexao-mongodb
  ```

## Uso
1. Inicie o servidor:
  ```bash
  npm start
  ```
2. Acesse a API em `http://localhost:3000`.

## Endpoints
- `GET /customers` - Lista todos os clientes
- `GET /customers/:id` - Busca um cliente por ID
- `POST /customers` - Cria um novo cliente
- `PUT /customers/:id` - Atualiza um cliente
- `DELETE /customers/:id` - Deleta um cliente

## Contribuição
1. Faça um fork do projeto
2. Crie uma nova branch:
  ```bash
  git checkout -b minha-nova-feature
  ```
3. Faça suas alterações e commit:
  ```bash
  git commit -m 'Adiciona nova feature'
  ```
4. Envie para o repositório remoto:
  ```bash
  git push origin minha-nova-feature
  ```
5. Abra um Pull Request

## Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.