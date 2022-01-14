var videoshow = require("videoshow");
const fs = require("fs");
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
var ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const directory = `${__dirname}\\immagini`;

function readFiles() {
  fs.readdir(directory, function (err, filenames) {
    if (err) {
      console.error(err);
      return [];
    }
    const images = [];
    filenames.forEach((filename) => images.push(directory + filename));
    return images;
  });
}

//per lo style inserire option subtitleStyle
//documentazione con stili consentiti: https://github.com/h2non/videoshow/blob/master/lib/substation.js#L49 
var videoOptions = {
  fps: 25,
  loop: 5, // seconds
  transition: true,
  transitionDuration: 1, // seconds
  videoBitrate: 1024,
  videoCodec: "libx264",
  size: "1920x?",
  audioBitrate: "128k",
  audioChannels: 2,
  format: "mp4",
  pixelFormat: "yuv420p",
};

let images = readFiles();
// image options: https://github.com/h2non/videoshow#image-options 
if (!images) {
  images = [
    {
      path: "C:\\Users\\marialoreta\\source\\repos\\test-nodejs-video\\immagini\\DEN_5197-Edit-1080p.jpg",
      caption: "Ciao!",
    },
    {
      path: "C:\\Users\\marialoreta\\source\\repos\\test-nodejs-video\\immagini\\DEN_6657-Edit.jpg",
      caption: "Come",
    },
    {
      path: "C:\\Users\\marialoreta\\source\\repos\\test-nodejs-video\\immagini\\DEN_6778-Edit.jpg",
      caption: "Stai?",
    },
  ];
}
//console.log("images", images);

videoshow(images, videoOptions)
  .save("video3.mp4")
  .on("start", function (command) {
    console.log("ffmpeg process started:", command);
  })
  .on("error", function (err, stdout, stderr) {
    console.error("Error: ", err);
    console.error("ffmpeg stdout: ", stdout);
    console.error("ffmpeg stderr: ", stderr);
  })
  .on("end", function (output) {
    console.error("Video created in: ", output);
  });
