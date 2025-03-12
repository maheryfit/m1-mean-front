import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Socket} from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class ChattingService {
  private socket: Socket;

  constructor() {
    console.log(environment.API_URL)
    this.socket = io(environment.WEBSOCKET_URL, {
        reconnectionDelayMax: 10000,

    });
    console.log(this.socket)
  }

  listen(eventName: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(eventName, (data) => {
        observer.next(data);
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
