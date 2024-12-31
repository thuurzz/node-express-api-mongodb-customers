import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";
import { CustomerRepository } from "../data/customer.repository";

const customerRepository = new CustomerRepository();
const customerService = new CustomerService(customerRepository);

export class CustomerController {
  /**
   * POST /customers
   */
  public async createCustomer(req: Request, res: Response): Promise<void> {
    try {
      const newCustomer = await customerService.createCustomer(req.body);
      res.status(201).json(newCustomer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao criar cliente." });
    }
  }

  /**
   * GET /customers
   */
  public async getAllCustomers(req: Request, res: Response): Promise<void> {
    try {
      const customers = await customerService.getAllCustomers();
      res.status(200).json(customers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar clientes." });
    }
  }

  /**
   * GET /customers/:id
   */
  public async getCustomerById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const customer = await customerService.getCustomerById(id);

      if (!customer) {
        res.status(404).json({ message: "Cliente não encontrado." });
      } else {
        res.status(200).json(customer);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar cliente." });
    }
  }

  /**
   * PUT /customers/:id
   */
  public async updateCustomer(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedCustomer = await customerService.updateCustomer(
        id,
        req.body
      );

      if (!updatedCustomer) {
        res.status(404).json({ message: "Cliente não encontrado." });
      } else {
        res.status(200).json(updatedCustomer);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao atualizar cliente." });
    }
  }

  /**
   * DELETE /customers/:id
   */
  public async deleteCustomer(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await customerService.deleteCustomer(id);

      if (!deleted) {
        res.status(404).json({ message: "Cliente não encontrado." });
      } else {
        // 204 = No Content
        res.status(204).send();
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao deletar cliente." });
    }
  }
}
