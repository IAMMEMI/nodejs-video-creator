var videoshow = require("videoshow");
const fs = require("fs");
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
var ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
const videoOptions = require("./videoOptions");

const directory = `${__dirname}\\immagini`;

const readFiles = () =>
  new Promise((resolve) =>
    fs.readdir(directory, function (err, filenames) {
      if (err) {
        console.error(err);
        resolve([]);
      }
      let images = [];
      filenames.forEach((filename) => images.push(directory + "\\" + filename));
      resolve(images);
    })
  );

const createVideo = (images, videoOptions) => {
  videoshow(images, videoOptions)
    .save(`${Date.now()}.mp4`)
    .on("start", function (command) {
      console.log("ffmpeg process started:", command);
    })
    .on("error", function (err, stdout, stderr) {
      console.error("Error: ", err);
    })
    .on("end", function (output) {
      console.error("Video created in: ", output);
    });
};

readFiles().then((images) => createVideo(images, videoOptions));
