import { IncomingMessage, Server, ServerResponse } from "node:http";
import WebSocket, { WebSocketServer } from "ws";

export interface ClientEvent {
    command: string
}

const startWSS = (server: Server<typeof IncomingMessage, typeof ServerResponse>) => {
    const wss = new WebSocketServer({ server });

    wss.on('listening', () => {
        console.log(`Websocket running on port ${process.env.PORT}.`);

        wss.on('connection', (ws: WebSocket) => {
            console.log("Client connected.");

            ws.on('message', (message: string) => {
                const event: ClientEvent = JSON.parse(message);

            //     switch (event) {
            //         case ""
            // }
            })
        });
    });
}

export default startWSS;