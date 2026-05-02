import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import axios from "axios";

const TOKEN = process.env.ACCESS_TOKEN!;
console.log("TOKEN LOADED");

type Stack = "backend" | "frontend";
type Level = "debug" | "info" | "warn" | "error" | "fatal";
type Package =
  | "cache"
  | "controller"
  | "cron_job"
  | "db"
  | "domain"
  | "handler"
  | "repository"
  | "route"
  | "service"
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style"
  | "auth"
  | "config"
  | "middleware"
  | "utils";

async function Log(
  stack: Stack,
  level: Level,
  pkg: Package,
  message: string
) {
  try {
    const res = await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      { stack, level, package: pkg, message },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res.data);
  } catch (err: any) {
    console.log("ERROR =", err.response?.data || err.message);
  }
}

Log("frontend", "info", "component", "logging middleware initialized");