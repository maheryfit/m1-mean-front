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
  destinateur_id: string = ""
  destinataire_id: string = ""
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
    console.log(data)
    this.feedback = `${data.id} is typing a message`
  }

  messageTyping(): void {
    console.log(`${this.destinateur_id} typing...`)
    this.chattingService.emitTyping(this.destinateur_id)
  }

  sendMessage() {
    this.chattingService.emitChat(this.message)
    this.message = ''
  }

}
