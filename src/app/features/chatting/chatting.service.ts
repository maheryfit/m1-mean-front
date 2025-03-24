import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Socket} from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class ChattingService {
  private readonly socket: Socket;

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

  emitOnline() {
    const id = localStorage.getItem("id");
    const nom_utilisateur = localStorage.getItem("nom_utilisateur");
    setInterval(()=> {
      this.socket.emit("online", {
        id: id,
        nom_utilisateur: nom_utilisateur
      });
    }, 5000)
  }

  emitOffline() {
    const id = localStorage.getItem("id");
    const nom_utilisateur = localStorage.getItem("nom_utilisateur");
    setInterval(()=> {
      this.socket.emit("offline", {
        id: id,
        nom_utilisateur: nom_utilisateur
      });
    }, 5000)
  }

  emitChat(message: string) {
    const id = localStorage.getItem("id");
    const nom_utilisateur = localStorage.getItem("nom_utilisateur");
    this.socket.emit("chat", {
      message: message,
      id: id,
      nom_utilisateur: nom_utilisateur,
    });
  }

  emitTyping(destinateur_id: string) {
    const id = destinateur_id;
    const nom_utilisateur = localStorage.getItem("nom_utilisateur");
    setInterval(()=> {
      this.socket.emit("typing", {
        id: id,
        nom_utilisateur: nom_utilisateur
      });
    }, 1000)
  }
}
