import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { EMPTY, Observable, Subject, timer } from 'rxjs';
import {
  catchError,
  delayWhen,
  retryWhen,
  switchAll,
  tap,
} from 'rxjs/operators';
import { Injectable } from '@angular/core';

const WS_ENDPOINT = 'ws://localhost:3000';
const RECONNECT_INTERVAL = 1000;

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket$: WebSocketSubject<any>;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe(
    switchAll(),
    catchError((e) => {
      throw e;
    })
  );

  public connect(cfg: { reconnect: boolean } = { reconnect: false }): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      const messages = this.socket$.pipe(
        cfg.reconnect ? this.reconnect : (o) => o,
        tap({
          error: (error) => console.log(error),
        }),
        catchError((_) => EMPTY)
      );
      this.messagesSubject$.next(messages);
    }
  }

  private getNewWebSocket() {
    return webSocket({
      url: WS_ENDPOINT,
      closeObserver: {
        next: () => {
          console.log('[DataService]: connection closed');
          this.socket$ = undefined;
          this.connect({ reconnect: true });
        },
      },
    });
  }

  private reconnect(observable: Observable<any>): Observable<any> {
    return observable.pipe(
      retryWhen((errors) =>
        errors.pipe(
          tap((val) => console.log('[Data Service] Try to reconnect', val)),
          delayWhen((_) => timer(RECONNECT_INTERVAL))
        )
      )
    );
  }

  sendMessage(msg: any) {
    console.log('nexted');
    this.socket$.next(msg);
  }

  close() {
    this.socket$.complete();
  }
}
