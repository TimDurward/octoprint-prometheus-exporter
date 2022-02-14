import { OctoprintApi } from "../octoprint-client";
import { Gauge } from "prom-client";

const octopi = new OctoprintApi(
  "F6995A876CAA42A08D5EA0061E8C4495", // Octoprint API key
  "http://octoprint.noop.svc.cluster.local:8080" // network path to Octoprint enabled printer
);

const printer_temp_actual_tool = new Gauge({
  name: "printer_temp_actual_tool",
  help: "Printer tool actual temperature",
  // labelNames: ["tool"],
});

const printer_temp_target_tool = new Gauge({
  name: "printer_temp_target_tool",
  help: "Printer tool target temperature",
  // labelNames: ["tool"],
});

const printer_temp_actual_bed = new Gauge({
  name: "printer_temp_actual_bed",
  help: "Printer bed actual temperature",
  // labelNames: ["bed"],
});

const printer_temp_target_bed = new Gauge({
  name: "printer_temp_target_bed",
  help: "Printer bed target temperature",
  // labelNames: ["bed"],
});

export async function tool_temperature() {
  const tool = await octopi.getStatus();

  // printer_temp_actual_tool
  if (tool.tools.tool0.actual) {
    printer_temp_actual_tool.set(tool.tools.tool0.actual);
    console.log("printer_temp_actual_tool", "collected", tool.tools.tool0.actual);
  }

  // printer_temp_target_tool
  if (tool.tools.tool0.target) {
    printer_temp_target_tool.set(tool.tools.tool0.target);
    console.log("printer_temp_target_tool", "collected", tool.tools.tool0.target);
  } else {
    printer_temp_target_tool.set(0);
    console.log("printer_temp_target_tool", "collected", 0)
  }
}

export async function bed_temperature() {
  const bed = await octopi.getStatus();

  // printer_temp_actual_bed
  if (bed.bed.actual) {
    printer_temp_actual_bed.set(bed.bed.actual);
    console.log("printer_temp_actual_bed", "collected", bed.bed.actual);
  }

  // printer_temp_target_bed
  if (bed.bed.target) {
    printer_temp_target_bed.set(bed.bed.target);
    console.log("printer_temp_target_bed", "collected", bed.bed.target);
  } else {
    printer_temp_target_bed.set(0)
    console.log("printer_temp_target_bed", "collected", 0)
  }
}
