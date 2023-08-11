import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of } from 'rxjs';
import { GrpcClientService } from './grpc-client.service';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';

const task = of({
  id: 0,
  title: 'my task',
  description: 'nothing!',
  createdAt: 1691758928150,
  updatedAt: 1691758928150,
});

const RawTaskMock = {
  id: 0,
  title: 'my task',
  description: 'nothing!',
  createdAt: 1691758928150,
  updatedAt: 1691758928150,
};

const gRPCMock = {
  create: jest.fn().mockReturnValue(task),
  findById: jest.fn().mockReturnValue(task),
  findAll: jest.fn().mockReturnValue(task),
  delete: jest.fn().mockReturnValue(task),
};

const taskMock = {};

describe('GrpcClientService', () => {
  let service: GrpcClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrpcClientService],
      imports: [
        ClientsModule.register([
          {
            name: 'TASK_PACKAGE',
            ...grpcClientOptions,
          },
        ]),
      ],
    }).compile();

    service = module.get<GrpcClientService>(GrpcClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    jest.clearAllMocks();

    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should return a task', async () => {
      expect(
        await lastValueFrom(
          service.create({
            title: 'hi',
            description: 'bye',
          }),
        ),
      ).toEqual(RawTaskMock);
    });

    it('should call gRPCClientService.create with right params', async () => {
      expect(gRPCMock.create).toHaveBeenCalledWith({
        title: 'hi',
        description: 'bye',
      });
    });
  });

  describe('getById', () => {
    jest.clearAllMocks();

    it('should be defined', () => {
      expect(service.getById).toBeDefined();
    });

    it('should return a task', async () => {
      expect(await lastValueFrom(service.getById(1))).toEqual(RawTaskMock);
    });

    it('should call gRPCClientService.getOne with right params', async () => {
      expect(gRPCMock.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('getAll', () => {
    jest.clearAllMocks();

    it('should be defined', () => {
      expect(service.getAll).toBeDefined();
    });

    it('should return all tasks', async () => {
      expect(await lastValueFrom(service.getAll({}))).toEqual(RawTaskMock);
    });

    it('should call gRPCClientService.getAll with right params', async () => {
      expect(gRPCMock.findAll).toHaveBeenCalledWith({});
    });
  });

  describe('delete', () => {
    jest.clearAllMocks();

    it('should be defined', () => {
      expect(service.delete).toBeDefined();
    });

    it('should delete one task', async () => {
      expect(await lastValueFrom(service.delete(2))).toEqual(RawTaskMock);
    });

    it('should call gRPCClientService.delete with right params', async () => {
      expect(gRPCMock.delete).toHaveBeenCalledWith({ id: 2 });
    });
  });
});
