import axios from "axios";
import { Flow } from "@mcesystems/reflow";
import { pick } from "lodash";

import { ViewInterfacesType } from "../viewInterfaces";

// Create WebSocket connection.
export const socket = new WebSocket("ws://localhost:4040/devices");

// Connection opened
socket.addEventListener("open", (event) => {
  // console.log("Connected to WS Server");
});

interface Device {
  locationId?: number;
  vendorId?: number;
  productId?: number;
  deviceName?: string;
  manufacturer?: string;
  serialNumber?: string;
  deviceAddress?: number;
}

const query = async () => {
  try {
    const d = await axios.get("http://localhost:4040/devices");
    const devices: Device[] = d.data.map((device: Device) => {
      return pick(device, ['deviceName', 'manufacturer', 'productId', 'deviceAddress'])
    });
    return devices;
  } catch (error) {
    console.log(`Error-main-query:`, error);
  }
};

export default <Flow<ViewInterfacesType>>(async ({ view, views }) => {
  
  socket.addEventListener("message", async () => deviceTree.update({ devices: await query()}));
  
  const deviceTree = view(0, views.DeviceTree, {
    isByType: false,
    devices: await query(),
	});

  deviceTree.on("myTriggeredEvent", async ({ eventData }) => {
    eventData ? deviceTree.update({ isByType: false}) : deviceTree.update({ isByType: true})
  });
  
	await view(0, views.DeviceTree,{
    isByType: false,
    devices: await query(),
  }, deviceTree);

  
});

