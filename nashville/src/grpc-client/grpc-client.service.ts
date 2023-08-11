import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { CreateTaskDto, FindAllDto, RawTask, Task, TaskById } from './dto';
import { ClientGrpc } from '@nestjs/microservices';

export interface TaskService {
  create(data: CreateTaskDto): Observable<RawTask>;
  findOne(data: TaskById): Observable<RawTask>;
  findAll(data: FindAllDto): Observable<RawTask>;
  delete(data: TaskById): Observable<RawTask>;
}

@Injectable()
export class GrpcClientService implements OnModuleInit {
  private taskService: TaskService;

  constructor(@Inject('TASK_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.taskService = this.client.getService<TaskService>('TaskService');
  }

  create(data: CreateTaskDto): Observable<Task> {
    return this.taskService.create(data).pipe(
      map((task) => {
        const { createdAt, updatedAt, ...other } = task;
        return {
          ...other,
          createdAt: new Date(Number(task.createdAt)),
          updatedAt: new Date(Number(task.updatedAt)),
        };
      }),
    );
  }

  getAll(data: FindAllDto): Observable<Task> {
    return this.taskService
      .findAll({
        offset: data.offset || 0,
        limit: data.limit || 10,
      })
      .pipe(
        map((task) => {
          const { createdAt, updatedAt, ...other } = task;
          return {
            ...other,
            createdAt: new Date(Number(task.createdAt)),
            updatedAt: new Date(Number(task.updatedAt)),
          };
        }),
      );
  }

  getById(id: number): Observable<Task> {
    return this.taskService.findOne({ id: +id }).pipe(
      map((task) => {
        const { createdAt, updatedAt, ...other } = task;
        return {
          ...other,
          createdAt: new Date(Number(task.createdAt)),
          updatedAt: new Date(Number(task.updatedAt)),
        };
      }),
    );
  }

  delete(id: number): Observable<Task> {
    return this.taskService.delete({ id: +id }).pipe(
      map((task) => {
        const { createdAt, updatedAt, ...other } = task;
        return {
          ...other,
          createdAt: new Date(Number(task.createdAt)),
          updatedAt: new Date(Number(task.updatedAt)),
        };
      }),
    );
  }
}
