import { Test, TestingModule } from '@nestjs/testing';
import { GatewayService } from './gateway.service';

describe('GatewayService', () => {
  let service: GatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GatewayService],
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
      ).toEqual({
        id: expect.any(Number),
        parentId: null,
        title: 'hi',
        description: 'bye',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  describe('findOneTask', () => {
    it('should be defined', () => {
      expect(service.findOneTask).toBeDefined();
    });

    it('should return a task', async () => {
      expect(await service.findOneTask(1)).toEqual({
        id: expect.any(Number),
        parentId: null,
        title: expect.any(String),
        description: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  describe('findALlTask', () => {
    it('should be defined', () => {
      expect(service.findAllTasks).toBeDefined();
    });

    it('should return all tasks', async () => {
      expect(await service.findAllTasks({})).toEqual([
        {
          id: expect.any(Number),
          parentId: null,
          title: expect.any(String),
          description: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ]);
    });
  });

  describe('deleteTask', () => {
    it('should be defined', () => {
      expect(service.deleteTask).toBeDefined();
    });

    it('should delete one task', async () => {
      expect(await service.deleteTask(2)).toEqual(true);
    });
  });
});
