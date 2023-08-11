import { Test, TestingModule } from '@nestjs/testing';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

describe('GatewayController', () => {
  let controller: GatewayController;

  const GatewayServiceMock = {
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
      ],
    }).compile();

    controller = module.get<GatewayController>(GatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTaskEvent', () => {
    it('should be defined', () => {
      expect(controller.createTaskEvent).toBeDefined();
    });

    it('should call GatewayService', async () => {
      expect(await controller.createTaskEvent({})).toEqual(true);

      expect(GatewayServiceMock.createTaskEvent).toHaveBeenCalled();
    });
  });

  describe('findOneTaskEvent', () => {
    it('should be defined', () => {
      expect(controller.findOneTaskEvent).toBeDefined();
    });

    it('should call GatewayService', async () => {
      expect(await controller.findOneTaskEvent({})).toEqual(true);

      expect(GatewayServiceMock.findOneTaskEvent).toHaveBeenCalled();
    });
  });

  describe('findAllTaskEvent', () => {
    it('should be defined', () => {
      expect(controller.findAllTasksEvent).toBeDefined();
    });

    it('should call GatewayService', async () => {
      expect(await controller.findAllTasksEvent({})).toEqual(true);

      expect(GatewayServiceMock.findAllTasksEvent).toHaveBeenCalled();
    });
  });

  describe('deleteTaskEvent', () => {
    it('should be defined', () => {
      expect(controller.deleteTaskEvent).toBeDefined();
    });

    it('should call GatewayService', async () => {
      expect(await controller.deleteTaskEvent({})).toEqual(true);

      expect(GatewayServiceMock.deleteTaskEvent).toHaveBeenCalled();
    });
  });
});
