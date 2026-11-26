import { spawn } from "node:child_process";

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const services = [
  { name: "api", args: ["run", "dev:api"] },
  { name: "web", args: ["run", "dev:web"] },
];
const children = services.map(({ name, args }) => {
  const child = spawn(npm, args, { stdio: "inherit", env: process.env });
  child.on("error", (error) => {
    console.error(`[${name}] ${error.message}`);
    shutdown(1);
  });
  child.on("exit", (code) => {
    if (code !== null && code !== 0) shutdown(code);
  });
  return child;
});

let stopping = false;
function shutdown(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) {
    if (child.exitCode === null) child.kill();
  }
  process.exitCode = code;
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
