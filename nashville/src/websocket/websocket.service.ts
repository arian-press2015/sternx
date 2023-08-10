import { Injectable } from '@nestjs/common';

@Injectable()
export class WebsocketService {
  findAll() {
    return `This action returns all websocket`;
  }
}
