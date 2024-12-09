import WebSocket = require("ws");

interface BroadcastMessage {
  subject: string;
  value: number | string;
}

export class Timer {
  private time: number; 
  private intervalId: NodeJS.Timeout | null;
  private wss: WebSocket.Server;
  private answers: number;

  constructor(webSocketServer: WebSocket.Server) {
    this.time = 0;
    this.intervalId = null;
    this.wss = webSocketServer;
    this.answers = 0;
  }

  startTimer(): void {
    if (this.intervalId) {
      console.log("Timer já está em execução.");
      return;
    }

    this.intervalId = setInterval(() => {
      if(this.time <= 1) {
        this.finishTimer();
      }

      if(this.answers >= this.wss.clients.size) {
        this.finishTimer;
      }

      this.time--;

      console.log(this.time);
      this.broadcast({ subject: "tick", value: this.time });
    }, 1000);

    console.log("Timer iniciado.");
  }

  finishTimer(): void {
    if (!this.intervalId) {
      console.log("Nenhum timer em execução para finalizar.");
      return;
    }

    clearInterval(this.intervalId); 
    this.intervalId = null;
    this.answers = 0;
    this.time = 0; 

    this.broadcast({ subject: "finish", value: this.time }); 
    console.log("Timer finalizado.");
  }

  setTime(time: number): void {
    this.time = time;
  }

  countAnswear(): void {
    this.answers++;
  }

  private broadcast(data: BroadcastMessage): void {
    const message = JSON.stringify(data);

    this.wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}
