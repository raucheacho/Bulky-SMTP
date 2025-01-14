const express = require("express");
const bodyParser = require("body-parser");
const emailRoutes = require("./routes/email");
const managerRoutes = require("./routes/manager");
const cors = require("cors");
const morgan = require("morgan");
const winston = require("winston");

// Configure Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

// Add console logging in development
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// Initialize Express app
const app = express();

// Request logging middleware
app.use(
  morgan(
    "[:date[iso]] :method :url :status :response-time ms - :res[content-length]"
  )
);

// CORS configuration
app.use(cors());

// Request body parsing middleware
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
    query: req.query,
    body: req.body,
    ip: req.ip,
    timestamp: new Date().toISOString(),
  });
  next();
});

// Health check route
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "healthy", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/emails", emailRoutes);
app.use("/api/manager", managerRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.url} not found`,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error({
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    body: req.body,
    timestamp: new Date().toISOString(),
  });

  res.status(err.status || 500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
    requestId: req.id,
  });
});

// Graceful shutdown handling
process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Performing graceful shutdown...");
  // Close your database connections here if any
  process.exit(0);
});

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection:", err);
  process.exit(1);
});

module.exports = app;
