export interface IGlobalMessage {
  type: MessageType;
  text: string;
  isShown: boolean;
}

export type MessageType = 'success' | 'info' | 'error';
