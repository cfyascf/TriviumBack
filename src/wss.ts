import { IncomingMessage, Server, ServerResponse } from "node:http";
import WebSocket, { WebSocketServer } from "ws";
import { Game, IBroadcastMessage } from "./services/timer.service";

export interface ClientEvent {
    command: string
}

const startWSS = (server: Server<typeof IncomingMessage, typeof ServerResponse>) => {
    const wss = new WebSocketServer({ server });
    const game = new Game(wss);

    wss.on('listening', () => {
        console.log(`Websocket running on port ${process.env.PORT}.`);

        wss.on('connection', (ws: WebSocket) => {
            console.log("Client connected.");

            ws.on('message', (message: string) => {
                const data = JSON.parse(message);

                switch (data.subject) {
                    case "start": 
                        game.startMatch();

                        if(typeof(data.value) === 'string') {
                            game.setQuestions(data.value);
                        }
                        break;

                    case "question":
                        game.sendCurrentQuestion();
                        game.setTime(30);
                        game.startTimer();

                    case "answer":
                        game.countAnswear();
                        break;

                    case "finish":
                        game.finishGame();
                        break;
                }
            });
            
            ws.on('close', () => {
                console.log("Client disconnected.");
            })
        });
    });
}

export default startWSS;