import { IncomingMessage, Server, ServerResponse } from "node:http";
import WebSocket, { WebSocketServer } from "ws";
import { Timer } from "./services/timer.service";

export interface ClientEvent {
    command: string
}

const startWSS = (server: Server<typeof IncomingMessage, typeof ServerResponse>) => {
    const wss = new WebSocketServer({ server });
    const timer = new Timer(wss);

    wss.on('listening', () => {
        console.log(`Websocket running on port ${process.env.PORT}.`);

        wss.on('connection', (ws: WebSocket) => {
            console.log("Client connected.");

            ws.on('message', (message: string) => {
                const data = message.toString();
                switch (data) {
                    case "start": 
                        timer.startMatch();
                        timer.setTime(60);
                        timer.startTimer();
                        break;

                    case "answer":
                        timer.countAnswear();
                        break;

                    case "finish":
                        timer.finishGame();
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