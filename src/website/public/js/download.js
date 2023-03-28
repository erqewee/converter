const convertButton = document.querySelector('.button-convert');
const inputURL = document.querySelector('.input-url');
const format = document.getElementById('format');
const quality = document.getElementById('quality');
const bitrate = document.getElementById('bitrate');
const qualityLabel = document.getElementById("quality-label");
const element = document.getElementById('downloading');

const serverURL = window.location.protocol;

convertButton.addEventListener('click', () => {
  const url = String(inputURL.value);
  if (!url) return alert("Provide 'Video URL' or 'Video CODE'!");

  const selectedFormat = format[format.selectedIndex].value;
  const selectedQuality = quality[quality.selectedIndex].value;
  const selectedBitrate = bitrate[bitrate.selectedIndex].value;

  inputURL.value = "";
  
  download(url.trim(), selectedFormat.toLowerCase(), selectedQuality.toLowerCase(), selectedBitrate.toLowerCase());
});

/**
 * @param {string} url 
 * @param {string} format 
 * @param {string} quality
 * @param {string} bitrate
 * @returns {Promise<void>}
 */
async function download(url, format, quality, bitrate) {
  const code = (url.includes("https://www.youtube.com/watch?v=") ? url.split("watch?v=")[1] : url);

  const response = await (await fetch(`${serverURL}/video/check/${code}`)).json();
  const videoData = JSON.parse(JSON.stringify(response));

  if (videoData.available) {
    const video = videoData.video;
    const author = video.author;

    element.innerHTML = `Starting the download of '<a href="${video.url}" target="_blank">${video.title}</a>' by '<a href="${author.channel.url}">${author.name}</a>'`;
    window.location.href = `${serverURL}/video/download/${code}?format=${format}&quality=${quality}&bitrate=${bitrate}`;
    setTimeout(() => element.innerHTML = "", (15 * 1000));
  } else alert("This video is not available. Check the URL (or CODE) and try again.");

  return void 0;
};