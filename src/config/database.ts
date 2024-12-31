import { MongoClient, Db } from "mongodb";

let db: Db;

export async function connectToDatabase(): Promise<void> {
  try {
    const MONGO_URI =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/customer_db";
    const client = new MongoClient(MONGO_URI);

    await client.connect();
    db = client.db(); // (Opcional) Você pode especificar o nome do DB: client.db('customer_db')
    console.log("Conexão com MongoDB estabelecida com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
}

/**
 * Retorna a instância de Db já conectada.
 * Levanta um erro caso a conexão ainda não tenha sido estabelecida.
 */
export function getDb(): Db {
  if (!db) {
    throw new Error(
      "Database não inicializado. Chame connectToDatabase primeiro."
    );
  }
  return db;
}
