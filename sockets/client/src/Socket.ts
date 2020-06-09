export class Socket {
  private ws: WebSocket;
  private receivedData: string[];

  constructor(url: string) {
    this.ws = new WebSocket(url)
    this.ws.onopen = () => {
      console.log('Client socket opened');
    }
    this.receivedData = [];
  }

  private send(data: string) {
    this.ws.send(data);
  }

  private addToReceivedData(data: string) {
    this.receivedData.push(data);
  }

  private getReceivedData() {
    return this.receivedData;
  }
}