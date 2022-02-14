import express from "express";
import prom from "prom-client";
import { Metrics } from "./metrics";

// Set octoprint service labels
const octo_service = { service: "octoprint" };
prom.register.setDefaultLabels(octo_service);

// Collect printer metrics every 10 seconds.
const cron = "*/10 * * * * *"
const metrics = new Metrics(cron);
metrics.collect(); 

const metricServer = express();
metricServer.get("/metrics", async (req, res) => {
  try {
    const metrics = await prom.register.metrics();
    res.send(metrics);
  } catch (error) {
    res.status(500).send({ error });
  }
});

metricServer.listen(9000, () =>
  console.log(`🚨 Prometheus listening on port 9991 /metrics`)
);
