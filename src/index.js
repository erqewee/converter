import { fetch, FetchResultTypes as Types } from "@sapphire/fetch";

import { resolve, join } from "node:path";

import express from "express";
const app = express();

import { Video } from "./Routers/export.js";

app.set("view engine", "ejs");
app.set("views", join("src/website"));

app.use(express.static(resolve("./src/website")));

app.use("/video", Video.default);
app.get("/", (req, res) => res.sendFile(join("src/website/index.html"), { root: "./" }));

app.listen(3000, () => {
  console.log("[Server] Server started.");

  setInterval(() => fetch("https://youtubeconverter.erenix.repl.co", {}, Types.Text).catch(() => null), (10 * 1000));
});

process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);