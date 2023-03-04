import core from "ytdl-core";
const { getBasicInfo } = core;

import { Router } from "express";
const router = Router();

router.get("/check/:code", (req, res) => {
  let { code } = req.params;

  getBasicInfo(`https://www.youtube.com/watch?v=${code}`)
    .then(({ videoDetails: video }) => res.json({ available: true, video: { title: video.title, url: video.video_url, author: { name: video.author.name, channel: { url: video.author.user_url, id: video.author.id, user: video.author.user } } } }))
    .catch((reason) => res.json({ available: false, reason, video: {} }));

  console.log(`[ServerRequest[Check[${code}]]] IP: ${req.ip} | URL: ${req.originalUrl}`);
});

router.get("/download/:code", (req, res) => {
  let { code } = req.params;

  let { format, quality } = req.query;

  getBasicInfo(`https://www.youtube.com/watch?v=${code}`)
    .then(({ videoDetails: video }) => {
      let title = video.title;

      title = title.replace(/[^\x00-\x7F]/g, "");
      format = format?.toLowerCase();

      res.header("Content-Disposition", `attachment; filename="${title}.${format}"`);
      core(video.video_url, { format: (format ?? "webm"), quality: (quality === "high" ? "highest" : "lowest"), filter: (format === "mp3" ? "audioonly" : "videoandaudio") }).pipe(res);
    })
    .catch((reason) => res.status(403).json({ code: 403, reason }));

  console.log(`[ServerRequest[Download[${code}]]] IP: ${req.ip} | URL: ${req.originalUrl}`);
});

export default router;