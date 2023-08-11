import { Test, TestingModule } from '@nestjs/testing';
import { LogService } from './log.service';

describe('LogService', () => {
  let service: LogService;

  const ClientProxyMock = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogService,
        {
          provide: 'TASKS_SERVICE',
          useValue: ClientProxyMock,
        },
      ],
    }).compile();

    service = module.get<LogService>(LogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTaskEvent', () => {
    jest.clearAllMocks();

    it('should be defined', () => {
      expect(service.createTaskEvent).toBeDefined();
    });

    it('should return true', async () => {
      jest.clearAllMocks();

      expect(
        await service.createTaskEvent({
          title: 'hi',
          description: 'bye',
        }),
      ).toEqual(true);
    });

    it('should call emit with right params', async () => {
      expect(ClientProxyMock.emit).toHaveBeenCalledWith('create-task', {
        title: 'hi',
        description: 'bye',
      });
    });
  });

  describe('findOneTaskEvent', () => {
    jest.clearAllMocks();

    it('should be defined', () => {
      expect(service.findOneTaskEvent).toBeDefined();
    });

    it('should return true', async () => {
      expect(await service.findOneTaskEvent(1)).toEqual(true);
    });

    it('should call emit with right params', async () => {
      expect(ClientProxyMock.emit).toHaveBeenCalledWith('findOne-task', {
        task_id: 1,
      });
    });
  });

  describe('findALlTaskEvent', () => {
    jest.clearAllMocks();

    it('should be defined', () => {
      expect(service.findAllTasksEvent).toBeDefined();
    });

    it('should return true', async () => {
      expect(await service.findAllTasksEvent({})).toEqual(true);
    });

    it('should call emit with right params', async () => {
      expect(ClientProxyMock.emit).toHaveBeenCalledWith('findAll-tasks', {});
    });
  });

  describe('deleteTaskEvent', () => {
    jest.clearAllMocks();

    it('should be defined', () => {
      expect(service.deleteTaskEvent).toBeDefined();
    });

    it('should return true', async () => {
      expect(await service.deleteTaskEvent(2)).toEqual(true);
    });

    it('should call emit with right params', async () => {
      expect(ClientProxyMock.emit).toHaveBeenCalledWith('delete-task', {
        task_id: 2,
      });
    });
  });
});
