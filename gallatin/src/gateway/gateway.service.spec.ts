import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { GatewayService } from './gateway.service';

const taskMock = {
  id: expect.any(Number),
  parentId: expect.any(Number),
  title: expect.any(String),
  description: expect.any(String),
  createdAt: 1691764207000,
  updatedAt: 1691764207000,
};

const sample = {
  id: 3,
  parentId: 0,
  title: 'asdf',
  description: 'fdsa',
  createdAt: new Date(1691764207000),
  updatedAt: new Date(1691764207000),
};

const PrismaServiceMock = {
  tasks: {
    create: jest.fn().mockReturnValue(sample),
    findFirst: jest.fn().mockReturnValue(sample),
    findMany: jest.fn().mockReturnValue([sample]),
    delete: jest.fn().mockReturnValue(sample),
  },
};

describe('GatewayService', () => {
  let service: GatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GatewayService,
        {
          provide: PrismaService,
          useValue: PrismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<GatewayService>(GatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTask', () => {
    it('should be defined', () => {
      expect(service.createTask).toBeDefined();
    });

    it('should return a task', async () => {
      expect(
        await service.createTask({
          title: 'hi',
          description: 'bye',
        }),
      ).toEqual(taskMock);
    });
  });

  describe('findOneTask', () => {
    it('should be defined', () => {
      expect(service.findOneTask).toBeDefined();
    });

    it('should return a task', async () => {
      expect(await service.findOneTask(1)).toEqual(taskMock);
    });
  });

  describe('findAllTask', () => {
    it('should be defined', () => {
      expect(service.findAllTasks).toBeDefined();
    });

    it('should return all tasks', async () => {
      expect(await service.findAllTasks({})).toEqual([taskMock]);
    });
  });

  describe('deleteTask', () => {
    it('should be defined', () => {
      expect(service.deleteTask).toBeDefined();
    });

    it('should delete one task', async () => {
      expect(await service.deleteTask(2)).toEqual(taskMock);
    });
  });
});
