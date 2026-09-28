#!/usr/bin/env node
// /devpings:world — draft the newest approved or released request in world mode (world-lib.mjs).
import { world } from "./world-lib.mjs";
world(process.argv.slice(2)).then((code) => process.exit(code));
