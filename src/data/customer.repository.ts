import { ObjectId } from "mongodb";
import { getDb } from "../config/database";

/**
 * Interface para representar um Cliente na aplicação.
 * O _id é opcional no momento da criação.
 * createdAt e updatedAt também podem ser gerenciados manualmente.
 */
export interface ICustomer {
  _id?: ObjectId;
  name: string;
  email: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CustomerRepository {
  /**
   * Cria um documento na coleção 'customers'
   */
  public async create(data: ICustomer): Promise<ICustomer> {
    const db = getDb();
    const result = await db.collection<ICustomer>("customers").insertOne(data);
    // Retorna o objeto inserido, adicionando o _id retornado pelo Mongo
    return { ...data, _id: result.insertedId };
  }

  /**
   * Retorna todos os documentos da coleção 'customers'
   */
  public async findAll(): Promise<ICustomer[]> {
    const db = getDb();
    return db.collection<ICustomer>("customers").find({}).toArray();
  }

  /**
   * Retorna um documento pelo ID
   */
  public async findById(id: string): Promise<ICustomer | null> {
    const db = getDb();
    return db
      .collection<ICustomer>("customers")
      .findOne({ _id: new ObjectId(id) });
  }

  /**
   * Atualiza um documento pelo ID
   */
  public async update(
    id: string,
    data: Partial<ICustomer>
  ): Promise<ICustomer | null> {
    const db = getDb();
    // findOneAndUpdate retorna informações adicionais, aqui capturamos apenas o documento final
    const result = await db.collection<ICustomer>("customers").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: "after" } // Retorna o documento após a atualização
    );
    return result; // Pode ser null se não encontrado
  }

  /**
   * Remove um documento pelo ID
   */
  public async delete(id: string): Promise<boolean> {
    const db = getDb();
    const result = await db
      .collection<ICustomer>("customers")
      .deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
}
