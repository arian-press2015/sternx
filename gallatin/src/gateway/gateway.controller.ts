import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateTaskDto, FindAllDto, Task } from './dto';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @GrpcMethod('create')
  createTask(data: CreateTaskDto, metadata: any): Promise<Task> {
    return this.gatewayService.createTask(data);
  }

  @GrpcMethod('findOne')
  findOneTask(id: number, metadata: any): Promise<Task> {
    return this.gatewayService.findOneTask(id);
  }

  @GrpcMethod('findAll')
  findAllTasks(data: FindAllDto, metadata: any): Promise<Task[]> {
    return this.gatewayService.findAllTasks(data);
  }

  @GrpcMethod('delete')
  deleteTask(id: number, metadata: any): Promise<boolean> {
    return this.gatewayService.deleteTask(id);
  }
}
