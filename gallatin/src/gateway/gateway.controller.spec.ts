import { Test, TestingModule } from '@nestjs/testing';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

const taskMock = {
  id: 0,
  parentId: null,
  title: 'my title',
  description: 'my description',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('GatewayController', () => {
  let controller: GatewayController;

  const GatewayServiceMock = {
    createTask: jest.fn().mockResolvedValue(taskMock),
    findOneTask: jest.fn().mockResolvedValue(taskMock),
    findAllTasks: jest.fn().mockResolvedValue([taskMock]),
    deleteTask: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatewayController],
      providers: [
        {
          provide: GatewayService,
          useValue: GatewayServiceMock,
        },
      ],
    }).compile();

    controller = module.get<GatewayController>(GatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTask', () => {
    it('should be defined', () => {
      expect(controller.createTask).toBeDefined();
    });

    it('should return a task', async () => {
      expect(
        await controller.createTask(
          {
            title: 'hi',
            description: 'bye',
          },
          {},
        ),
      ).toEqual(taskMock);

      expect(GatewayServiceMock.createTask).toHaveBeenCalled();
    });
  });

  describe('findOneTask', () => {
    it('should be defined', () => {
      expect(controller.findOneTask).toBeDefined();
    });

    it('should return a task', async () => {
      expect(await controller.findOneTask(1, {})).toEqual(taskMock);

      expect(GatewayServiceMock.findOneTask).toHaveBeenCalled();
    });
  });

  describe('findALlTask', () => {
    it('should be defined', () => {
      expect(controller.findAllTasks).toBeDefined();
    });

    it('should return all tasks', async () => {
      expect(await controller.findAllTasks({}, {})).toEqual([taskMock]);

      expect(GatewayServiceMock.findAllTasks).toHaveBeenCalled();
    });
  });

  describe('deleteTask', () => {
    it('should be defined', () => {
      expect(controller.deleteTask).toBeDefined();
    });

    it('should delete one task', async () => {
      expect(await controller.deleteTask(2, {})).toEqual(true);

      expect(GatewayServiceMock.deleteTask).toHaveBeenCalled();
    });
  });
});
