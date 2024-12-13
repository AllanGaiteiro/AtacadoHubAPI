import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { TypeUser } from './enum/type-user.enum';
import { User } from './entities/user.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  const mockUserRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user and set createdAt and updatedAt fields', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '123456',
        type: TypeUser.COMERCIANTE,
        phone: '99999-9999',
        address: '123 Street, City',
      };

      const mockUser = {
        ...createUserDto,
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUserRepository.create.mockReturnValue(mockUser);  // Mock para create
      mockUserRepository.save.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(result).toEqual(mockUser);
      expect(userRepository.save).toHaveBeenCalledWith(expect.objectContaining({
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }));
    });

    it('should throw an error if email already exists', async () => {
      // Simulando um usuário existente com o e-mail "duplicate.email@example.com"
      const existingUser = {
        id: '1',
        email: 'duplicate.email@example.com',
        name: 'Existing User',
        password: '123456',
        type: TypeUser.COMERCIANTE,
        phone: '99999-9999',
        address: '123 Street, City',
      };
    
      // Mocking a resposta do repositório para encontrar um usuário com o mesmo e-mail
      mockUserRepository.findOneBy.mockResolvedValue(existingUser);
    
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'duplicate.email@example.com',
        password: '123456',
        type: TypeUser.COMERCIANTE,
        phone: '99999-9999',
        address: '123 Street, City',
      };
    
      await expect(service.create(createUserDto)).rejects.toThrowError(
        new ConflictException('Email já está em uso'),
      );
    });

  });

  describe('update', () => {
    it('should update a user and set updatedAt field', async () => {
      const updateUserDto = { name: 'John Smith' };
      const existingUser = {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updatedUser = { ...existingUser, ...updateUserDto, updatedAt: new Date() };

      mockUserRepository.create.mockResolvedValue(existingUser);
      mockUserRepository.save.mockResolvedValue(existingUser);
      mockUserRepository.findOneBy.mockResolvedValue(existingUser);

      mockUserRepository.save.mockResolvedValue(updatedUser);

      const result = await service.update('1', updateUserDto);

      expect(result).toEqual(updatedUser);
      expect(userRepository.save).toHaveBeenCalledWith(expect.objectContaining({
        updatedAt: expect.any(Date),
      }));
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
        { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com' },
      ];

      mockUserRepository.find.mockResolvedValue(users);

      const result = await service.findAll();

      expect(result).toEqual(users);
      expect(userRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const user = { id: '1', name: 'John Doe', email: 'john.doe@example.com' };

      mockUserRepository.findOneBy.mockResolvedValue(user);

      const result = await service.findOne('1');

      expect(result).toEqual(user);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    });

    it('should throw a NotFoundException if user is not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const user = { id: '1', name: 'John Doe', email: 'john.doe@example.com' };

      mockUserRepository.findOneBy.mockResolvedValue(user);
      mockUserRepository.remove.mockResolvedValue(undefined);

      await service.remove('1');

      expect(userRepository.remove).toHaveBeenCalledWith(user);
    });

    it('should throw a NotFoundException if user is not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);

      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('lifecycle hooks', () => {
    it('should set createdAt before insert', () => {
      const user = new User();
      user.setCreateDate();

      expect(user.createdAt).toBeDefined();
      expect(user.createdAt).toBeInstanceOf(Date);
    });

    it('should set updatedAt before update', () => {
      const user = new User();
      user.setUpdateDate();

      expect(user.updatedAt).toBeDefined();
      expect(user.updatedAt).toBeInstanceOf(Date);
    });
  });
});
