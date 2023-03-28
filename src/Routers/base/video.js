import core from "ytdl-core";
const { getBasicInfo, validateURL } = core;

import { Router } from "express";
const router = Router();

router.get("/check/:code", (req, res) => {
  let { code } = req.params;

  const url = `https://www.youtube.com/watch?v=${code}`;

  if (!validateURL(url)) return res.status(404).json({ available: false, reason: "Invalid Video", video: {} });

  getBasicInfo(url)
    .then(({ videoDetails: video }) => res.status(200).json({ available: true, video: { title: video.title, url: video.video_url, author: { name: video.author.name, channel: { url: video.author.user_url, id: video.author.id, user: video.author.user } } } }))
    .catch((reason) => res.status(403).json({ available: false, reason, video: {} }));

  console.log(`[ServerRequest[Check[${code}]]] IP: ${req.ip} | URL: ${req.originalUrl}`);
});

router.get("/download/:code", (req, res) => {
  let { code } = req.params;

  let { format, quality, bitrate } = req.query;

  const url = `https://www.youtube.com/watch?v=${code}`;

  getBasicInfo(url)
    .then(({ videoDetails: video }) => {
      let title = video.title;

      title = title.replace(/[^\x00-\x7F]/g, "");
      format = format ?? format.toLowerCase();

      res.header("Content-Disposition", `attachment; filename="${title}.${format}"`);
      
      const request = core(video.video_url, { format: (format ?? "webm"), quality: (quality === "HIGH" ? "highest" : "lowest"), filter: (format === "mp3" ? "audioonly" : "videoandaudio"), bitrate: (bitrate === "default" ? null : parseInt(bitrate)) });
      request.pipe(res);
    }).catch((reason) => res.status(403).json({ code: 403, reason }));

  console.log(`[ServerRequest[Download[${code}]]] IP: ${req.ip} | URL: ${req.originalUrl}`);
});

router.get("/watch/:code", (req, res) => {
  let { code } = req.params;

  const url = `https://www.youtube.com/watch?v=${code}`;

  if (!validateURL(url)) return res.status(404).json({ available: false, reason: "Invalid Video" });

  res.redirect(url);
});

export default router;