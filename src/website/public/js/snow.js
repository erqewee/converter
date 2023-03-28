function createSnow() {
  var snow = document.createElement('i');
  var base = document.getElementById("snowRain");
  var body = document.getElementsByTagName("BODY")[0];
  var bodyHeight = body.clientHeight;

  base.style.height = `${bodyHeight}px`;
  snow.classList.add('fa', 'fa-snowflake-o');
  snow.style.left = `${Math.random() * body.clientWidth}px`;;
  snow.style.opacity = Math.random();
  snow.style.animationDuration = `${Math.random() * 3 + 2}s`;

  base.appendChild(snow);

  setTimeout(() => snow.remove(), (6 * 1000));
};

setInterval(createSnow, 130);