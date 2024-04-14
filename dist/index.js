"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express'
const ws_1 = require("ws");
const express = require('express');
const app = express();
const httpServer = app.listen(8080);
const wss = new ws_1.WebSocketServer({ server: httpServer });
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    ws.send('Hello! Message From Server!!');
});
app.listen(() => {
    console.log(`Example app listening on port }`);
});
