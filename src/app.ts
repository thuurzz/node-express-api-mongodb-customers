import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import customerRoutes from "./routes/customer.routes";

export function createApp(): Application {
  const app = express();

  // Middlewares básicos
  app.use(express.json());
  app.use(cors());
  app.use(helmet());

  // Rotas
  app.use("/customers", customerRoutes);

  // Rota de teste
  app.get("/", (req, res) => {
    res.send(
      "API de Cadastro de Clientes - Node.js + TypeScript + MongoDB (Driver Nativo)"
    );
  });

  return app;
}
