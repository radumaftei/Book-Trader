import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationSocketService {
  socket: any;
  readonly URL: string = 'http://localhost:3000';

  constructor() {}

  init() {
    this.socket = io(this.URL);
    this.socket.on('connect', () => {});
    this.socket.on('disconnect', () => {});
  }

  webSocketConnect() {
    return this.socket;
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  joinUser(email: string) {
    this.socket.emit('join', { email });
  }
}
