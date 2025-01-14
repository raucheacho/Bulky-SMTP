#!/usr/bin/env node

const { execSync } = require("child_process");

const command = process.argv[2];

switch (command) {
  case "start":
    console.log("Starting services...");
    execSync("docker-compose up -d", { stdio: "inherit" });
    break;
  case "stop":
    console.log("Stopping services...");
    execSync("docker-compose down", { stdio: "inherit" });
    break;
  case "logs":
    console.log("Fetching logs...");
    execSync("docker-compose logs -f", { stdio: "inherit" });
    break;
  default:
    console.log("Usage: cli.js [start|stop|logs]");
}
