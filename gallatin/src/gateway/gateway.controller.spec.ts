import { Test, TestingModule } from '@nestjs/testing';
import { LogService } from '../log/log.service';
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

  const LogServiceMock = {
    createTaskEvent: jest.fn().mockResolvedValue(true),
    findOneTaskEvent: jest.fn().mockResolvedValue(true),
    findAllTasksEvent: jest.fn().mockResolvedValue(true),
    deleteTaskEvent: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatewayController],
      providers: [
        {
          provide: GatewayService,
          useValue: GatewayServiceMock,
        },
        {
          provide: LogService,
          useValue: LogServiceMock,
        },
      ],
    }).compile();

    controller = module.get<GatewayController>(GatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTask', () => {
    jest.clearAllMocks();

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
    });

    it('should call GatewayService.createTask with right params', async () => {
      expect(GatewayServiceMock.createTask).toHaveBeenCalledWith({
        title: 'hi',
        description: 'bye',
      });
    });

    it('should call LogService.createTaskEvent with right params', async () => {
      expect(LogServiceMock.createTaskEvent).toHaveBeenCalledWith({
        title: 'hi',
        description: 'bye',
      });
    });
  });

  describe('findOneTask', () => {
    jest.clearAllMocks();

    it('should be defined', () => {
      expect(controller.findOneTask).toBeDefined();
    });

    it('should return a task', async () => {
      expect(await controller.findOneTask(1, {})).toEqual(taskMock);
    });

    it('should call GatewayService.findOneTask with right params', async () => {
      expect(GatewayServiceMock.findOneTask).toHaveBeenCalledWith(1);
    });

    it('should call LogService.findOneTaskEvent with right params', async () => {
      expect(LogServiceMock.findOneTaskEvent).toHaveBeenCalledWith(1);
    });
  });

  describe('findALlTask', () => {
    jest.clearAllMocks();

    it('should be defined', () => {
      expect(controller.findAllTasks).toBeDefined();
    });

    it('should return all tasks', async () => {
      expect(await controller.findAllTasks({}, {})).toEqual([taskMock]);
    });

    it('should call GatewayService.findAllTasks with right params', async () => {
      expect(GatewayServiceMock.findAllTasks).toHaveBeenCalledWith({});
    });

    it('should call LogService.findAllTasksEvent with right params', async () => {
      expect(LogServiceMock.findAllTasksEvent).toHaveBeenCalledWith({});
    });
  });

  describe('deleteTask', () => {
    jest.clearAllMocks();

    it('should be defined', () => {
      expect(controller.deleteTask).toBeDefined();
    });

    it('should delete one task', async () => {
      expect(await controller.deleteTask(2, {})).toEqual(true);
    });

    it('should call GatewayService.deleteTask with right params', async () => {
      expect(GatewayServiceMock.deleteTask).toHaveBeenCalledWith(2);
    });

    it('should call LogService.deleteTaskEvent with right params', async () => {
      expect(LogServiceMock.deleteTaskEvent).toHaveBeenCalledWith(2);
    });
  });
});
