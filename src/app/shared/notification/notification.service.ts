import { NotificationType } from './notification-type.enum';
import { NotifierService } from 'angular-notifier';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  showNotification(
    content = '',
    type: NotificationType = NotificationType.SUCCESS
  ): void {
    this.notifier.notify(type, content);
  }
}
