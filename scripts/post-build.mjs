import { cpSync, mkdirSync, rmSync, existsSync } from "fs";
import { resolve } from "path";

const root = process.cwd();
const dist = resolve(root, "dist");
const out = resolve(root, ".vercel/output");

if (existsSync(out)) rmSync(out, { recursive: true });
mkdirSync(out, { recursive: true });

cpSync(resolve(dist, "config.json"), resolve(out, "config.json"));

mkdirSync(resolve(out, "static"), { recursive: true });
cpSync(resolve(dist, "client"), resolve(out, "static"), { recursive: true });

const funcDir = resolve(out, "functions/__server.func");
mkdirSync(funcDir, { recursive: true });
cpSync(resolve(dist, "server"), funcDir, { recursive: true });

console.log("✓ Restructured dist/ → .vercel/output/ for Vercel Build Output API v3");