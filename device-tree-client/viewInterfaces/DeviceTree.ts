import { ViewInterface } from "@mcesystems/reflow";


export interface Input {
  devices?: Device[];
  isByType: boolean;
}

interface Device {
  productId?: number;
  deviceName?: string;
  manufacturer?: string;
  deviceAddress?: number;
}

export interface Events {
	myTriggeredEvent: {
		eventData: boolean
	};
}

export default interface DeviceTree extends ViewInterface<Input, Events> { }
