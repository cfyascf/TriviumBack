import WebSocket = require("ws");

interface BroadcastMessage {
  type: string;
  time?: number;
  finalTime?: number;
}

export class Timer {
  private time: number; 
  private intervalId: NodeJS.Timeout | null;
  private wss: WebSocket.Server;

  constructor(webSocketServer: WebSocket.Server) {
    this.time = 0;
    this.intervalId = null;
    this.wss = webSocketServer;
  }

  startTimer(): void {
    if (this.intervalId) {
      console.log("Timer já está em execução.");
      return;
    }

    this.intervalId = setInterval(() => {
      this.time--;

      if(this.time <= 0) {
        this.finishTimer();
      }

      this.broadcast({ type: "tick", time: this.time });
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
    this.broadcast({ type: "finish", finalTime: this.time }); 

    console.log("Timer finalizado.");
    this.time = 0; 
  }

  setTimer(time: number): void {
    this.time = time;
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
