enum MessageComing {
  OUTGOING = "outgoing",
  INCOMING = "incoming",
}

export enum SocketEvent {
  CHAT= "chat",
  TYPING = "typing",
}

export interface Chatting {
  username: string;
  message: string
  from: MessageComing
}
