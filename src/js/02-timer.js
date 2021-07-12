import Swal from 'sweetalert2';
const startBtn = document.querySelector('button[data-start]');
const daysUrl = document.querySelector('span[data-days]');
const hoursUrl = document.querySelector('span[data-hours]');
const minutesUrl = document.querySelector('span[data-minutes]');
const secondsUrl = document.querySelector('span[data-seconds]');
const input = document.querySelector('#date-selector');




class Timer {
  constructor({ onTick }) {
    this.timerId = null;
      this.onTick = onTick;
     this.isActive = false;
    this.init();
  }

  init() {
    const time = this.convertMs(0);
      this.onTick(time);
  
  }
 
    
    start() {
           if (this.isActive) {
      return;
    }
        
         
        this.isActive = true;

        this.timerId = setInterval(() => {
    const startTime = input.valueAsNumber;
      const currentTime = Date.now();
      const ms = startTime - currentTime;
      const time = this.convertMs(ms);

      this.onTick(time);
    }, 1000);
        }
    ;
    
    


  stop() {
    clearInterval(this.timerId);
    this.isActive = false;
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

      pad(value) {
    return String(value).padStart(2, '0');
  }

 convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = this.pad(Math.floor(ms / day));
  // Remaining hours
  const hours = this.pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
    }
   
}

const timer = new Timer({
    onTick: updateClockface,
});


startBtn.setAttribute("disabled", true);

function validation() {
  
    if (input.valueAsNumber <= Date.now()) {
        Swal.fire('Please choose a date in the future')
    } else { startBtn.removeAttribute("disabled") };
}




function updateClockface({ days, hours, minutes, seconds }) {
    daysUrl.textContent = `${days}`
 hoursUrl.textContent = `${hours}`
 minutesUrl.textContent = `${minutes}`
 secondsUrl.textContent = `${seconds}`};


input.addEventListener('input', validation);

startBtn.addEventListener('click',timer.start.bind(timer));