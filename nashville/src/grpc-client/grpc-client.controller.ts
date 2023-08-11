import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateTaskDto, FindAllDto, Task } from './dto';
import { GrpcClientService } from './grpc-client.service';

@Controller()
export class GrpcClientController {
  constructor(private readonly grpcClientService: GrpcClientService) {}

  @Post()
  create(@Body() data: CreateTaskDto): Observable<Task> {
    return this.grpcClientService.create(data);
  }

  @Get()
  getAll(@Param() data: FindAllDto): Observable<Task> {
    return this.grpcClientService.getAll(data);
  }

  @Get(':id')
  getById(@Param('id') id: number): Observable<Task> {
    return this.grpcClientService.getById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<Task> {
    return this.grpcClientService.delete(id);
  }
}
