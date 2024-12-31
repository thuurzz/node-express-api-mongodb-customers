// customer.service.ts

import { ICustomer, CustomerRepository } from "../data/customer.repository";

export class CustomerService {
  constructor(private customerRepo: CustomerRepository) {}

  public async createCustomer(data: ICustomer): Promise<ICustomer> {
    data.createdAt = new Date();
    data.updatedAt = new Date();
    return this.customerRepo.create(data);
  }

  public async getAllCustomers(): Promise<ICustomer[]> {
    return this.customerRepo.findAll();
  }

  public async getCustomerById(id: string): Promise<ICustomer | null> {
    return this.customerRepo.findById(id);
  }

  public async updateCustomer(
    id: string,
    data: Partial<ICustomer>
  ): Promise<ICustomer | null> {
    data.updatedAt = new Date();
    return this.customerRepo.update(id, data);
  }

  public async deleteCustomer(id: string): Promise<boolean> {
    return this.customerRepo.delete(id);
  }
}
