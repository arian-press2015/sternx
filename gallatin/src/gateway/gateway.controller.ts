import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { LogService } from '../log/log.service';
import { CreateTaskDto, FindAllDto, Task } from './dto';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(
    private readonly gatewayService: GatewayService,
    private readonly logService: LogService,
  ) {}

  @GrpcMethod('create')
  async createTask(data: CreateTaskDto, metadata: any): Promise<Task> {
    const result = await this.gatewayService.createTask(data);
    await this.logService.createTaskEvent(data);
    return result;
  }

  @GrpcMethod('findOne')
  async findOneTask(id: number, metadata: any): Promise<Task> {
    const result = await this.gatewayService.findOneTask(id);
    await this.logService.findOneTaskEvent(id);
    return result;
  }

  @GrpcMethod('findAll')
  async findAllTasks(data: FindAllDto, metadata: any): Promise<Task[]> {
    const result = await this.gatewayService.findAllTasks(data);
    await this.logService.findAllTasksEvent(data);
    return result;
  }

  @GrpcMethod('delete')
  async deleteTask(id: number, metadata: any): Promise<boolean> {
    const result = await this.gatewayService.deleteTask(id);
    await this.logService.deleteTaskEvent(id);
    return result;
  }
}
