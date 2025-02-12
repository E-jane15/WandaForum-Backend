import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { NotificationService }  from 'src/notification/notification.services';


@WebSocketGateway({ cors: true })
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private notificationsService: NotificationService) {}

  async sendNotification(userId: string, content: string) {
    const notification = await this.notificationsService.createNotification(
      {
        id: Date.now(),  
        userId,
        message:content,
        type:'community', 
      })
    this.server.to(userId).emit('newNotification', notification);
  }

  @SubscribeMessage('join')
  handleJoin(@MessageBody() userId: string, client: any) {
    client.join(userId);
  }
}
