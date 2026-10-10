export const progressBarInit = () => {
  const progress = document.getElementById("progress-bar-inner");
  if (!progress) {
    return
  }

  const updateBar = () => {
    const now = new Date();
    const currentSecond = now.getSeconds() + (now.getMilliseconds() / 1000);

    let timeElapsed;

    if (currentSecond <= 1) {
      timeElapsed = 29 + currentSecond;
    } else if (currentSecond <= 31) {
      timeElapsed = currentSecond - 1;
    } else {
      timeElapsed = currentSecond - 31;
    }

    const percentage = (timeElapsed / 30) * 100;
    progress.style.width = `${percentage}%`;

    requestAnimationFrame(updateBar);
  }

  requestAnimationFrame(updateBar);
}
