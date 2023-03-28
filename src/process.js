import { ChildProcess, fork } from "node:child_process";

spawn(fork("./src/index.js"));

/**
 * @param {ChildProcess} child 
 */
function spawn(child) {
  child.on("exit", () => spawn(fork("./src/index.js")));
  child.on("error", console.error);
};