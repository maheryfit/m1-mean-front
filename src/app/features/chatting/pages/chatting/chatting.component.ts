import {Component} from '@angular/core';
import {ChattingService} from '../../chatting.service';
import {Chatting, SocketEvent} from '../../chatting.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-chatting',
  imports: [
    FormsModule
  ],
  templateUrl: './chatting.component.html',
  styleUrl: './chatting.component.css'
})
export class ChattingComponent {
  title = 'Chatting';
  output: Array<Chatting> = []
  message: string = ""
  username: string = ""
  feedback: string = ""

  constructor(private chattingService: ChattingService) {
    this.chattingService.listen(SocketEvent.TYPING).subscribe((data) => this.updateFeedBack(data))
    this.chattingService.listen(SocketEvent.CHAT).subscribe((data) => this.updateMessage(data))
  }


  private updateMessage(data: Chatting) {
    this.feedback = ""
    console.log(data)
    this.output.push(data)
  }

  private updateFeedBack(data: any) {
    this.feedback = `${data} is typing a message`
  }

  messageTyping(): void {
    console.log(`${this.username} typing...`)
    this.chattingService.emit('typing', this.username)
    this.chattingService.emit('typing', {
      username: this.username,
      target: this.username === "Mahery" ? "Fitahiana": this.username,
    })
  }

  sendMessage() {
    console.log(`${this.username} send message ${this.message}`)
    this.chattingService.emit('chat', {
      message: this.message,
      username: this.username,
      target: this.username === "Mahery" ? "Fitahiana": this.username,
    })
    this.message = ''
  }

}
