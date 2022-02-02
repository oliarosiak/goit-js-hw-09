import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

/**
 * Decoration
*/

const htmlEl = document.querySelector('html');
htmlEl.classList.add('timer-html');

const bodyEl = document.querySelector('body');
bodyEl.classList.add('timer-body');

const timerWrapper = document.querySelector('div.timer');
const finishText = document.createElement('p');
timerWrapper.after(finishText);
finishText.classList.add('finish-text');

/**
 * Timer script
*/

const inputRef = document.querySelector('input[type="text"]');
const startBtn = document.querySelector('button[data-start]');

inputRef.classList.add('timer-input');
startBtn.classList.add('timer-btn');

let refs = {
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    mins: document.querySelector('span[data-minutes]'),
    secs: document.querySelector('span[data-seconds]'),
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        let currentDate = new Date();
        let timerId = null;
        //console.log('1: ', currentDate);
        if (selectedDates[0] <= currentDate) {           
            startBtn.setAttribute('disabled', 'disabled');
            window.alert('Please choose a date in the future'); 
            return;
        } else (
            startBtn.removeAttribute('disabled')
        )

        startBtn.addEventListener('click', () => {
            timerId = setInterval(() => {            
                currentDate = new Date();

                let deltaTime = selectedDates[0] - currentDate;   
                
                if (currentDate.toString() === selectedDates[0].toString()) {
                    clearInterval(timerId);
                    finishText.textContent = 't-i-m-e --- i-s --- o-u-t (｡◕‿◕｡)';
                    console.log('time is out');
                    return;
                }

                let { days, hours, minutes, seconds } = convertMs(deltaTime);
               
                refs.days.textContent = `${days}`;
                refs.hours.textContent = `${hours}`;
                refs.mins.textContent = `${minutes}`;
                refs.secs.textContent = `${seconds}`;
            }, 1000) 
            console.log(timerId);
        })
    },
};

flatpickr(inputRef, options);

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}