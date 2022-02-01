import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const inputRef = document.querySelector('input[type="text"]');
const startBtn = document.querySelector('button[data-start]');

let refs = {
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    mins: document.querySelector('span[data-minutes]'),
    secs: document.querySelector('span[data-seconds]'),
}

const currentDate = Date.now();

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        let usersDate = selectedDates[0].getTime();
        if (usersDate <= currentDate) {           
            startBtn.setAttribute('disabled', 'disabled');
            window.alert('Please choose a date in the future'); 
            return;
        } else (
            startBtn.removeAttribute('disabled')
        )
      
        startBtn.addEventListener('click', () => {
            setInterval(() => {
                const deltaTime = usersDate - currentDate;
                const { days, hours, minutes, seconds } = convertMs(deltaTime);
                console.log(`${days}, ${hours}, ${minutes}, ${seconds}`);
                refs.days.textContent = days;
                refs.hours.textContent = hours;
                refs.mins.textContent = minutes;
                refs.secs.textContent = seconds;
            }, 1000)
            
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