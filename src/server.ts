import { createApp } from "./app";
import { connectToDatabase } from "./config/database";
import dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

dotenv.config();

async function startServer(): Promise<void> {
  await connectToDatabase();
  const app = createApp();

  // Carregar o arquivo YAML do Swagger
  const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

  // Configurar o middleware do Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Documentação da API disponível em http://localhost:${PORT}/api-docs`);
  });
}

startServer().catch((err) => {
  console.error("Erro ao iniciar o servidor:", err);
});
