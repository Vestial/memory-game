class Stopwatch {
    constructor(elem) {


        let time = 0;
        let interval;
        let offset;


        const update = () => {
            if (this.isOn) {
                time += delta();
            }
            let formattedTime = timeFormat(time);
            elem.textContent = formattedTime;

        };


        const delta = () => {
            let now = Date.now();
            let timePassed = now - offset;
            offset = now;
            return timePassed;
        };


        const timeFormat = (timeInMilSeconds) => {
            let time = new Date(timeInMilSeconds);
            let minutes = time.getMinutes().toString();
            let seconds = time.getSeconds().toString();

            minutes.length < 2 ? minutes = `0${minutes}` : null;
            seconds.length < 2 ? seconds = `0${seconds}` : null;
            
            return `${minutes} : ${seconds}`;
        };


        this.isOn = false;


        this.start = () => {
            if (!this.isOn) {
                interval = setInterval(update, 10);
                offset = Date.now();
                this.isOn = true;
            }
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