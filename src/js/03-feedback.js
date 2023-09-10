import _, { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('.feedback-form input');
const messageInput = document.querySelector('.feedback-form textarea');

emailInput.addEventListener(
  'input',
  _.throttle(event => {
    try {
      const inf = {
        email: event.currentTarget.value,
        message: form.elements.message.value,
      };
      const serializedState = JSON.stringify(inf);
      localStorage.setItem('feedback-form-state', serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }, 500)
);

messageInput.addEventListener(
  'input',
  _.throttle(event => {
    try {
      const inf = {
        email: form.elements.email.value,
        message: event.currentTarget.value,
      };
      const serializedState = JSON.stringify(inf);
      localStorage.setItem('feedback-form-state', serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }, 500)
);

window.addEventListener('load', event => {
  try {
    const serializedState = localStorage.getItem('feedback-form-state');
    const inf =
      serializedState === null ? undefined : JSON.parse(serializedState);
    if (inf === undefined) {
      form.elements.email.value = '';
      form.elements.message.value = '';
    } else {
      form.elements.email.value = inf.email;
      form.elements.message.value = inf.message;
    }
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
});

form.addEventListener('submit', event => {
  try {
    event.preventDefault();
    localStorage.removeItem('feedback-form-state');
    const serializedState = localStorage.getItem('feedback-form-state');
    const inf =
      serializedState === null
        ? {
            email: '',
            message: '',
          }
        : JSON.parse(serializedState);

    console.log(`Email: ${inf.email}`);
    console.log(`Message: ${inf.message}`);
    form.reset();
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
});
