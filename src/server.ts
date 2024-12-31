import { createApp } from "./app";
import { connectToDatabase } from "./config/database";
import dotenv from "dotenv";

dotenv.config();

async function startServer(): Promise<void> {
  await connectToDatabase();
  const app = createApp();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Erro ao iniciar o servidor:", err);
});
