import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('form.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
}

refs.form.addEventListener('submit', onSubmitBtn);

function onSubmitBtn(event) {
  event.preventDefault();

  let firstDeleyValue = Number(refs.delay.value);  
  let stepDeleyValue = Number(refs.step.value);
  let amountValue = refs.amount.value;  

  for (let position = 1; position <= amountValue; position += 1){
    let delay;

    if (position > 1) {
      firstDeleyValue += stepDeleyValue;
    }

    delay = firstDeleyValue;

    createPromise(position, delay)
      .then(value => Notiflix.Notify.success(value))
      .catch(error => Notiflix.Notify.warning(error));
  }  
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
  return promise;
}

