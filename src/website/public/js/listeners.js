const fmt = document.getElementById('format');

fmt.addEventListener("change", (e) => {
  const selectedFormt = fmt[fmt.selectedIndex].value;

  if (selectedFormt === "MP3") {
    quality.hidden = true;
    qualityLabel.hidden = true;
  };

  if (quality.hidden && selectedFormt !== "MP3") {
    quality.hidden = false;
    qualityLabel.hidden = false;
  };
});