import mongoose from "mongoose";
import { readFile } from "fs/promises";
import path from "path";

export const connectDb = async (dbUri: string) => {
  try {
    const conn = await mongoose.connect(dbUri);
    console.log(`Connected to Database...`);
  } catch (error: any) {
    console.log(`Error Connection to DB:  \n ${error.message}`);
    // process.exit(1);
  }
};

export const getAPIVersion = async () => {
  const packageJson = await readFile(
    path.resolve(__dirname, "../package.json"),
    "utf-8"
  );

  const { version } = JSON.parse(packageJson);
  return version;
};
