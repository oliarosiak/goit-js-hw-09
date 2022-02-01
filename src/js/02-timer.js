import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

/**
 * Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом "Please choose a date in the future".
 * Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
 * Кнопка «Start» должа быть не активна до тех пор, пока пользователь не выбрал дату в будущем.
 * При нажатии на кнопку «Start» начинается отсчет времени до выбранной даты с момента нажатия.
*/
const inputRef = document.querySelector('input[type="text"]');
const startBtn = document.querySelector('button[data-start]');

const currentDate = new Date();
// console.log(currentDate.getTime())
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const usersDate = selectedDates[0].getTime();
        if (usersDate <= currentDate.getTime()) {           
            startBtn.setAttribute('disabled', 'disabled');
            window.alert('Please choose a date in the future'); 
        } else (
            startBtn.removeAttribute('disabled')
        )
        // console.log(usersDate);        
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