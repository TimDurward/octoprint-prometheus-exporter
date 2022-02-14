import { OctoprintApi } from "../octoprint-client";
import { Gauge } from "prom-client";

const octopi = new OctoprintApi(
  "F6995A876CAA42A08D5EA0061E8C4495", // Octoprint API key
  "http://octoprint.noop.svc.cluster.local:8080" // network path to Octoprint enabled printer
);

const printer_version = new Gauge({
  name: "printer_version",
  help: "Octoprint Version",
  labelNames: ["api", "server", "text"],
});

export async function info() {
  const version = await octopi.getVersion();

  // printer_api_version
  if (version.api && version.server && version.text) {
    printer_version.labels(version.api, version.server, version.text).set(0);
    console.log("printer_version", "collected", { version });
  }
}
