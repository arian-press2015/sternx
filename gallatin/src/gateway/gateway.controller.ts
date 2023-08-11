import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { LogService } from '../log/log.service';
import { CreateTaskDto, FindAllDto, Task, TaskById } from './dto';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(
    private readonly gatewayService: GatewayService,
    private readonly logService: LogService,
  ) {}

  @GrpcMethod('TaskService')
  async create(data: CreateTaskDto, metadata: any): Promise<Task> {
    const result = await this.gatewayService.createTask(data);
    await this.logService.createTaskEvent(data);
    return result;
  }

  @GrpcMethod('TaskService')
  async findOne(taskById: TaskById, metadata: any): Promise<Task> {
    const result = await this.gatewayService.findOneTask(taskById.id);
    await this.logService.findOneTaskEvent(taskById.id);
    return result;
  }

  @GrpcMethod('TaskService')
  async findAll(data: FindAllDto, metadata: any): Promise<Observable<Task>> {
    const repoStream = await this.gatewayService.findAllTasks(data);

    const observable = new Observable<Task>((subscriber) => {
      repoStream.map((value) => {
        subscriber.next(value);
      });
      subscriber.complete();
    });

    await this.logService.findAllTasksEvent(data);

    return observable;
  }

  @GrpcMethod('TaskService')
  async delete(taskById: TaskById, metadata: any): Promise<Task> {
    const result = await this.gatewayService.deleteTask(taskById.id);
    await this.logService.deleteTaskEvent(taskById.id);
    return result;
  }
}
