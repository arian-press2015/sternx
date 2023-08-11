import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of } from 'rxjs';
import { CreateTaskDto } from './dto';
import { GrpcClientController } from './grpc-client.controller';
import { GrpcClientService } from './grpc-client.service';

const task = of({
  id: 0,
  title: 'my task',
  description: 'nothing!',
  createdAt: '2023-08-11T13:04:19.614Z',
  updatedAt: '2023-08-11T13:04:19.614Z',
});

const GrpcClientServiceMock = {
  create: jest.fn().mockReturnValue(task),
  getAll: jest.fn().mockReturnValue(task),
  getById: jest.fn().mockReturnValue(task),
  delete: jest.fn().mockReturnValue(task),
};

const taskMock = {
  id: expect.any(Number),
  title: expect.any(String),
  description: expect.any(String),
  createdAt: '2023-08-11T13:04:19.614Z',
  updatedAt: '2023-08-11T13:04:19.614Z',
};

describe('GrpcClientController', () => {
  let controller: GrpcClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrpcClientController],
      providers: [
        { provide: GrpcClientService, useValue: GrpcClientServiceMock },
      ],
    }).compile();

    controller = module.get<GrpcClientController>(GrpcClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTask', () => {
    jest.clearAllMocks();

    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    it('should return a task', async () => {
      expect(
        await lastValueFrom(
          controller.create({
            title: 'hi',
            description: 'bye',
          }),
        ),
      ).toEqual(taskMock);
    });

    it('should call GatewayService.createTask with right params', async () => {
      expect(GrpcClientServiceMock.create).toHaveBeenCalledWith({
        title: 'hi',
        description: 'bye',
      });
    });
  });

  describe('getById', () => {
    jest.clearAllMocks();

    it('should be defined', () => {
      expect(controller.getById).toBeDefined();
    });

    it('should return a task', async () => {
      expect(await lastValueFrom(controller.getById(1))).toEqual(taskMock);
    });

    it('should call GatewayService.findOneTask with right params', async () => {
      expect(GrpcClientServiceMock.getById).toHaveBeenCalledWith(1);
    });
  });

  describe('getAll', () => {
    jest.clearAllMocks();

    it('should be defined', () => {
      expect(controller.getAll).toBeDefined();
    });

    it('should return all tasks', async () => {
      expect(await lastValueFrom(controller.getAll({}))).toEqual(taskMock);
    });

    it('should call GatewayService.findAllTasks with right params', async () => {
      expect(GrpcClientServiceMock.getAll).toHaveBeenCalledWith({});
    });
  });

  describe('delete', () => {
    jest.clearAllMocks();

    it('should be defined', () => {
      expect(controller.delete).toBeDefined();
    });

    it('should delete one task', async () => {
      expect(await lastValueFrom(controller.delete(2))).toEqual(taskMock);
    });

    it('should call GatewayService.deleteTask with right params', async () => {
      expect(GrpcClientServiceMock.delete).toHaveBeenCalledWith(2);
    });
  });
});
