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

  describe('createTaskEvent', () => {
    it('should be defined', () => {
      expect(service.createTaskEvent).toBeDefined();
    });

    it('should return true', async () => {
      expect(await service.createTaskEvent({})).toEqual(true);
    });
  });

  describe('findOneTaskEvent', () => {
    it('should be defined', () => {
      expect(service.findOneTaskEvent).toBeDefined();
    });

    it('should return true', async () => {
      expect(await service.findOneTaskEvent({})).toEqual(true);
    });
  });

  describe('findAllTaskEvent', () => {
    it('should be defined', () => {
      expect(service.findAllTasksEvent).toBeDefined();
    });

    it('should return true', async () => {
      expect(await service.findAllTasksEvent({})).toEqual(true);
    });
  });

  describe('deleteTaskEvent', () => {
    it('should be defined', () => {
      expect(service.deleteTaskEvent).toBeDefined();
    });

    it('should return true', async () => {
      expect(await service.deleteTaskEvent({})).toEqual(true);
    });
  });
});
