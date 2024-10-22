import * as dotenv from "dotenv";

// Use for development
dotenv.config({ path: "dev.env" });

// Use for production

// dotenv.config({ path: "prod.env" });

console.log("ENV : ", process.env.NODE_ENV);

import express, { Application } from "express";
import { connectDb, getAPIVersion } from "./config";
import cors from "cors";

import userRoutes from "./routes/user.route";

const app: Application = express();
const port = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || "";
let VERSION = "unknown";

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

(async () => {
  try {
    await connectDb(DB_URI);
    VERSION = await getAPIVersion();
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    );
  } catch (error: any) {
    console.error(`Error starting server: \n ${error.message}`);
  }
})();

// Routes
app.get("/", (req, res) => {
  res.json({
    message: `Welcome to the API version ${VERSION}`,
  });
});

// User Routes
app.use("/api/v1", userRoutes);

// 404 Route
app.get("*", (req, res) => {
  res.status(404).json({ message: "Page not found!" });
});
