import { CustomerService } from "../customer.service";
import { CustomerRepository, ICustomer } from "../../data/customer.repository";
import { ObjectId } from "mongodb";

// Para simplificar o mock, você pode usar bibliotecas como 'jest-mock-extended',
// mas aqui faremos manualmente.

describe("CustomerService", () => {
  let mockRepository: jest.Mocked<CustomerRepository>;
  let customerService: CustomerService;

  beforeEach(() => {
    // Cria um mock "vazio" para todos os métodos do CustomerRepository
    mockRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<CustomerRepository>;

    // Injeta o mockRepository no serviço
    customerService = new CustomerService(mockRepository);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa chamadas de mock entre testes
  });

  describe("createCustomer", () => {
    it("deve criar um novo cliente com timestamps", async () => {
      // Arrange
      const inputData: ICustomer = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123456789",
      };

      const fakeResult: ICustomer = {
        _id: new ObjectId("60f7f976f0718b0022d1a334"),
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123456789",
        createdAt: new Date(), // timestamps serão definidos no service
        updatedAt: new Date(),
      };

      // Quando chamarmos mockRepository.create, retorne fakeResult
      mockRepository.create.mockResolvedValue(fakeResult);

      // Act
      const result = await customerService.createCustomer(inputData);

      // Assert
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      // Verifica se passamos os campos adequados para o create
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "123456789",
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        })
      );
      // Verifica o resultado final
      expect(result).toEqual(fakeResult);
    });
  });

  describe("getAllCustomers", () => {
    it("deve retornar todos os clientes", async () => {
      // Arrange
      const customers: ICustomer[] = [
        { _id: new ObjectId(), name: "Alice", email: "alice@mail.com" },
        { _id: new ObjectId(), name: "Bob", email: "bob@mail.com" },
      ];

      mockRepository.findAll.mockResolvedValue(customers);

      // Act
      const result = await customerService.getAllCustomers();

      // Assert
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(2);
      expect(result).toEqual(customers);
    });
  });

  describe("getCustomerById", () => {
    it("deve retornar o cliente pelo ID", async () => {
      // Arrange
      const id = "60f7f976f0718b0022d1a999";
      const expectedCustomer: ICustomer = {
        _id: new ObjectId(id),
        name: "Charlie",
        email: "charlie@mail.com",
      };

      mockRepository.findById.mockResolvedValue(expectedCustomer);

      // Act
      const result = await customerService.getCustomerById(id);

      // Assert
      expect(mockRepository.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedCustomer);
    });

    it("deve retornar null se não encontrar o cliente", async () => {
      const id = "60f7f976f0718b0022d1a999";
      mockRepository.findById.mockResolvedValue(null);

      const result = await customerService.getCustomerById(id);

      expect(result).toBeNull();
    });
  });

  describe("updateCustomer", () => {
    it("deve atualizar o cliente e retornar o objeto atualizado", async () => {
      // Arrange
      const id = "60f7f976f0718b0022d1a999";
      const updatedData = { phone: "987654321" };
      const updatedCustomer: ICustomer = {
        _id: new ObjectId(id),
        name: "Charlie",
        email: "charlie@mail.com",
        phone: "987654321",
        updatedAt: new Date(),
      };

      mockRepository.update.mockResolvedValue(updatedCustomer);

      // Act
      const result = await customerService.updateCustomer(id, updatedData);

      // Assert
      expect(mockRepository.update).toHaveBeenCalledWith(
        id,
        expect.objectContaining({
          phone: "987654321",
          updatedAt: expect.any(Date),
        })
      );
      expect(result).toEqual(updatedCustomer);
    });

    it("deve retornar null se o cliente não existe", async () => {
      // Arrange
      const id = "invalid-id";
      mockRepository.update.mockResolvedValue(null);

      // Act
      const result = await customerService.updateCustomer(id, {});

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("deleteCustomer", () => {
    it("deve deletar o cliente e retornar true", async () => {
      // Arrange
      const id = "60f7f976f0718b0022d1a999";
      mockRepository.delete.mockResolvedValue(true);

      // Act
      const result = await customerService.deleteCustomer(id);

      // Assert
      expect(mockRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toBe(true);
    });

    it("deve retornar false se o cliente não for encontrado", async () => {
      // Arrange
      const id = "60f7f976f0718b0022d1a999";
      mockRepository.delete.mockResolvedValue(false);

      // Act
      const result = await customerService.deleteCustomer(id);

      // Assert
      expect(result).toBe(false);
    });
  });
});
