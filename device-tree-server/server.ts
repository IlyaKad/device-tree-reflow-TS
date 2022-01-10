import express from "express";
const app = express();
import server from "http";
const s = server.createServer(app);
import WebSocket from "ws";
import cors from "cors";
import usbDetect from "usb-detection";

const wss = new WebSocket.Server({ server: s });

const PORT = 4040;

usbDetect.startMonitoring();

wss.on(
  "connection",
   (ws) => {
    console.log("A new client Connected!");
    ws.send("Welcome New Client!");

    usbDetect.on("add", (device) => {
      console.log("add", device);
      ws.send("Device connected");
    });

    usbDetect.on("remove", (device) => {
      console.log("remove", device);
      ws.send("Device disconnected");
    });
  }
);

app.get("/devices", cors(), async (req, res) => {
  try {
    const devices = await usbDetect.find();
    res.send(devices);
  } catch (error) {
    console.log(`error`, error);
    throw error;
  }
});

s.listen(PORT, () => console.log(`Server ready at port ${PORT}!`));
