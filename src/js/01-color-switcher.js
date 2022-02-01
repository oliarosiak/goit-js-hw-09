const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    bodyRef: document.querySelector('body'),
    paragraphRef: document.querySelector('p')
}
let timerId = null;
/**
 *  Buttons design
 */
const wrapperRef = document.createElement('div');
refs.paragraphRef.after(wrapperRef);
wrapperRef.append(refs.startBtn, refs.stopBtn);

wrapperRef.classList.add('wrapper');
refs.startBtn.classList.add('btn', 'start');
refs.stopBtn.classList.add('btn', 'stop', 'onstop');
/**
 *  Styles for buttons and body
 */
refs.startBtn.addEventListener('click', onStartBtn);
refs.stopBtn.addEventListener('click', onStopBtn);

function onStartBtn() {
    timerId = setInterval(() => {
        refs.bodyRef.style.backgroundColor = getRandomHexColor();
    }, 1000)
    refs.startBtn.setAttribute('disabled', 'disabled');
    refs.startBtn.classList.add('onclick');
    refs.stopBtn.classList.remove('onstop');
}

function onStopBtn() {
    clearInterval(timerId);
    refs.startBtn.removeAttribute('disabled');
    refs.startBtn.classList.remove('onclick');
    refs.stopBtn.classList.add('onstop');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
