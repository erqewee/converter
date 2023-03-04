import { fork } from "child_process";

spawn(fork("./src/index.js"));
function spawn(child) {
  child.on("exit", (code, signal) => spawn(fork("./src/index.js")));
  child.on("error", (err) => console.log(`Error: ${err}`));
};