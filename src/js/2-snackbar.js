
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formSubmit = document.querySelector(".form");

formSubmit.addEventListener("submit", onSubmit);

function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const delay = formData.get("delay");
    const state = formData.get("state");
    createNotification(delay, state);
    formSubmit.reset()
}

function createNotification(delay, state) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                console.log(`✅ Обіцянка виконана через ${delay}мс`);
                res(`Обіцянка виконана через ${delay}мс`);
            } else {
                console.log(`❌ Обіцянка відхилена через ${delay}мс`);
                rej(` Обіцянка відхилена через ${delay}мс`);
            }
        }, delay);
    }).then(success => {
        iziToast.success({
            message: success,
            messageColor: '#FFFFFF',
            backgroundColor: '#59a10d',
            position: 'topRight'
        });
    }).catch(error => {
        iziToast.error({
            message: error,
            messageColor: '#FFFFFF',
            backgroundColor: '#B51B1B',
            position: 'topRight'
        });
    });
}
