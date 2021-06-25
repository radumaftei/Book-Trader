import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationSocketService {
  socket: any;
  readonly URL: string = 'http://localhost:3000';

  init() {
    this.socket = io(this.URL);
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  joinUser(email: string) {
    this.socket.emit('join', { email });
  }
}
