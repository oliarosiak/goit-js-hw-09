/**
 * Напиши скрипт, который при сабмите формы вызывает функцию 
 * createPromise(position, delay) столько раз, сколько ввели в поле amount. 
 * При каждом вызове передай ей номер создаваемого промиса (position) 
 * и задержку учитывая введенную пользователем первую задержку (delay) и шаг (step).
*/

const refs = {
  form: document.querySelector('form.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
}

refs.form.addEventListener('submit', onSubmitBtn);

function onSubmitBtn(event) {
  event.preventDefault();
  let firstDeleyValue = refs.delay.value;
  let stepDeleyValue = refs.step.value;
  let amountValue = refs.amount.value;
  let delay = 0;

  for (let position = 1; position <= amountValue; position += 1) {
    delay = firstDeleyValue;
    if (position > 1) {
      delay = stepDeleyValue;          
    }
    
    setTimeout(createPromise(position, delay), delay) ;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  // console.log(shouldResolve);
  if (shouldResolve) {
    console.log('aaaaaaa');// Fulfill
  } else {
    console.log('beeeee');// Reject
  }
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
