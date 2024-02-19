import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const button = document.querySelector(`button[type="button"]`)
const input = document.querySelector(`input[type="text"]`)
const day = document.querySelector('[data-days]')
const hour = document.querySelector('[data-hours]')
const minute = document.querySelector('[data-minutes]')
const second = document.querySelector('[data-seconds]')
let intervalId
function deactivateButton() {
    button.disabled = true; 
}
function activateButton() {
    button.disabled = false; 
}
deactivateButton()
let userSelectedDate
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0]; 
        userSelectedDate = selectedDates[0]; 
   validateData(userSelectedDate)
    },
}
flatpickr(`input[type="text"]`, options
)

function validateData(date){
    const specificDate = new Date(date); 
    const nowDate = new Date
    const unixNowDate = nowDate.getTime();
const unixTimeSpecific = specificDate.getTime();

 
 if (nowDate >= specificDate) {
    deactivateButton()
    iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#FFFFFF',
        backgroundColor: '#B51B1B',
        position: 'topRight',
        iconUrl: '../img/errorIcon.svg'
    })
 }
 else{
   activateButton()
 }
}

function TimeDifference(){
    const selectedDate  = userSelectedDate? new Date(userSelectedDate) : new Date()
    const now = new Date
    const different = selectedDate - now
   if (different < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }; 
} else {
    return convertMs(different);
}
}
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

button.addEventListener("click", () => {
    intervalId = setInterval(() => {
        const difference = TimeDifference();
        day.textContent = addLeadingZero(difference.days)
        hour.textContent = addLeadingZero(difference.hours);
        minute.textContent = addLeadingZero(difference.minutes);
        second.textContent = addLeadingZero(difference.seconds);
        if (difference.days === 0 && difference.hours === 0 && difference.minutes === 0 && difference.seconds === 0) {
            clearInterval(intervalId)}
    }, 1000);
    input.disabled = true;
    deactivateButton();
    
});
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
  
