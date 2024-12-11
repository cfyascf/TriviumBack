import WebSocket = require("ws");
import { getMatchByIdService } from "./match.service";
import { findQuestionByFormIdService, findQuestionByIdService } from "./question.service";

export interface IBroadcastMessage {
  subject: string;
  value: number | string | IQuestion;
}

export interface IQuestionData {
  title: string,
  formId: string
}

export interface IOption {
  description: string,
  isRight: boolean
}

export interface IQuestion {
  question: IQuestionData,
  options: IOption[]
}

export class Game {
  private time: number; 
  private intervalId: NodeJS.Timeout | null;
  private wss: WebSocket.Server;
  private answers: number;
  private questions: string[];
  private index: number;

  constructor(webSocketServer: WebSocket.Server) {
    this.time = 0;
    this.intervalId = null;
    this.wss = webSocketServer;
    this.answers = 0;
    this.questions = [];
    this.index = 0;
  }

  startMatch(): void {
    this.broadcast({ subject: "start", value: "match started" });
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

    this.broadcast({ subject: "next", value: this.time }); 
    console.log("Timer finalizado.");
  }

  setTime(time: number): void {
    this.time = time;
  }

  countAnswear(): void {
    this.answers++;
  }

  async setQuestions(matchId: string): Promise<void> {
    const service = await getMatchByIdService(matchId);
    this.questions = <string[]>service.questions;
  }

  async sendCurrentQuestion(): Promise<void> {
    const service = await findQuestionByIdService(this.questions[this.index]);
    this.broadcast({ subject: "question", value: service as unknown as IQuestion });
  }

  private broadcast(data: IBroadcastMessage): void {
    const message = JSON.stringify(data);

    this.wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  finishGame(): void {
    this.finishTimer();
    this.broadcast({subject: "finish", value: "game finished"});
    console.log("Game finished");
  }
}
