import DeviceTreeInterface from "../viewInterfaces/DeviceTree";
import { ReflowReactComponent } from "@mcesystems/reflow-react-display-layer";
import * as React from "react";

class DeviceTree extends ReflowReactComponent<DeviceTreeInterface> {
  render() {
    const {devices, event, isByType} = this.props
		return (
      <div className="main-container">
        <h1>Device Tree</h1>
        <button className={isByType ? "" : "active"} onClick={() => event("myTriggeredEvent", { eventData: true })}>By USB Hubs</button>
        <button className={isByType ? "active" : ""} onClick={() => event("myTriggeredEvent", { eventData: false })}>By Type</button>
      {!isByType && devices.map(device => {
        const { deviceName, manufacturer, productId, deviceAddress } = device;
        return (
          <div key={deviceAddress}>
				    <h2>{deviceName}</h2>
				    <ul>
              <li>Manufacturer: {manufacturer}</li>
              <li>Produc ID: {productId}</li>
              <li>deviceAddress: {deviceAddress}</li>
            </ul>
			    </div>
        )
      })}
      {isByType && devices.map(device => {
        const { deviceName, manufacturer, productId, deviceAddress } = device;
        return (
          <div key={deviceAddress}>
				<h2>{manufacturer}</h2>
				<ul>
          <li>Name: {deviceName}</li>
          <li>Produc ID: {productId}</li>
          <li>deviceAddress: {deviceAddress}</li>
        </ul>
			</div>
        )
      })}
      </div>
		);
	}
}

export default DeviceTree;
