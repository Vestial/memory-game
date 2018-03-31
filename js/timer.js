class timer {
  constructor(a, b) {
    let time = 0;
    let interval;
    let offset;

    const timeFormat = timeInSec => {
      let time = new Date(timeInSec);
      let minutes = time.getMinutes().toString();
      let seconds = time.getSeconds().toString();

      if (minutes.length < 2) {
        minutes = `0${minutes}`;
      }
      if (seconds.length < 2) {
        seconds = `0${seconds}`;
      }

      return `${minutes} : ${seconds}`;
    };
    
    const changeInTime = () => {
        let currentTime = Date.now();
        let timePassed = currentTime - offset;
        offset = currentTime;
        return timePassed;
      };
    this.isOn = false;

    this.start = () => {
      if (!this.isOn) {
        interval = setInterval(update, 10);
        offset = Date.now();
        this.isOn = true;
      }
    };

    const update = () => {
        if (this.isOn) {
          time += changeInTime();
        }
        let formattedTime = timeFormat(time);
        a.textContent = formattedTime;
        b.textContent = formattedTime;
      };

    this.stop = () => {
      if (this.isOn) {
        clearInterval(interval);
        interval = null;
        this.isOn = false;
      }
    };

    this.reset = () => {
      if (!this.isOn) {
        time = 0;
        update();
      }
    };
  }
}
