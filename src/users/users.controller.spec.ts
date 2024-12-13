import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TypeUser } from './enum/type-user.enum';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create', () => {
    it('should call UsersService.create with correct parameters', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe', email: 'john.doe@example.com',
        password: '123456',
        type: TypeUser.COMERCIANTE,
        phone: '99999-9999',
        address: '13606-867'
      };
      const result = { id: '1', ...createUserDto };

      mockUsersService.create.mockResolvedValue(result);

      expect(await usersController.create(createUserDto)).toEqual(result);
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should call UsersService.findAll and return the result', async () => {
      const result = [{ id: '1', name: 'John Doe', email: 'john.doe@example.com' }];

      mockUsersService.findAll.mockResolvedValue(result);

      expect(await usersController.findAll()).toEqual(result);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call UsersService.findOne with the correct id', async () => {
      const id = '1';
      const result = { id, name: 'John Doe', email: 'john.doe@example.com' };

      mockUsersService.findOne.mockResolvedValue(result);

      expect(await usersController.findOne(id)).toEqual(result);
      expect(usersService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should call UsersService.update with the correct parameters', async () => {
      const id = '1';
      const updateUserDto: UpdateUserDto = { name: 'John Smith' };
      const result = { id, ...updateUserDto };

      mockUsersService.update.mockResolvedValue(result);

      expect(await usersController.update(id, updateUserDto)).toEqual(result);
      expect(usersService.update).toHaveBeenCalledWith(id, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should call UsersService.remove with the correct id', async () => {
      const id = '1';
      const result = { success: true };

      mockUsersService.remove.mockResolvedValue(result);

      expect(await usersController.remove(id)).toEqual(result);
      expect(usersService.remove).toHaveBeenCalledWith(id);
    });
  });
});
