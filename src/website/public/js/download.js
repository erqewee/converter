const convertButton = document.querySelector('.button-convert');
const inputURL = document.querySelector('.input-url');
const format = document.getElementById('format');
const quality = document.getElementById('quality');
const qualityLabel = document.getElementById("quality-label");

const serverURL = 'https://youtubeconverter.erenix.repl.co';

convertButton.addEventListener('click', () => {
  const url = String(inputURL.value);
  if (!url) return alert("Provide 'Video URL' or 'Video CODE'!");

  const selectedFormat = format[format.selectedIndex].value;
  const selectedQuality = quality[quality.selectedIndex].value;
  if (url.trim().length > 0) download(url, selectedFormat.toLowerCase(), selectedQuality);
});

format.addEventListener("change", () => {
  const selectedFormat = format[format.selectedIndex].value;

  if (selectedFormat === "MP3") {
    quality.hidden = true;
    qualityLabel.hidden = true;
  };

  if (quality.hidden && selectedFormat !== "MP3") {
    quality.hidden = false;
    qualityLabel.hidden = false;
  };
});

/**
 * 
 * @param {string} url 
 * @param {string} format 
 * @param {string} quality 
 */
async function download(url, format, quality) {  
  const code = (url.includes("https://www.youtube.com/watch?v=") ? url.split("watch?v=")[1] : url);

  (await fetch(`${serverURL}/video/check/${code}`)).json().then((data) => {
    const videoData = JSON.parse(JSON.stringify(data));
    
    if (videoData.available) {
      const video = videoData.video;
      const author = video.author;

      const element = document.getElementById('downloading');
      
      element.innerHTML = `Starting the download of '<a href="${video.url}" target="_blank">${video.title}</a>' by '<a href="${author.channel.url}">${author.name}</a>'`;
      window.location.href = `${serverURL}/video/download/${code}?format=${format}&quality=${quality}`;
      setTimeout(() => element.innerHTML = "", (15 * 1000));
    } else alert("This video is not available. Check the URL (or CODE) and try again.");
  });
};