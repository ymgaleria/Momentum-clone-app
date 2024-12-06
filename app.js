const submit = document.querySelector('#submit');
const userName = document.querySelector('input');
const greeting = document.querySelector('#greeting');
const nameQtn = document.querySelector('#name-qtn');
const home = document.querySelector('#home');
const time = document.querySelector('#time');
const goalInput = document.querySelector('#goal-input');
const goalQtn = document.querySelector('#goal-qtn');
const goal = document.querySelector('#goal')

submit.addEventListener('click', () => {
    nameQtn.style.display = 'none';
    home.style.display = 'block';
    greeting.innerText = `Hi ${userName.value}`;
})

function updateTime() {
    const now = new Date();
    const currentTime = now.toLocaleTimeString();
    time.textContent = currentTime;
  }
  setInterval(updateTime, 1000);

goal.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        goalQtn.style.display = 'none';
        goalInput.style.display = 'block';
        goalInput.innerText = `${goal.value}`;
    }
})

// For Quotes API
const quoteAPI = "https://api.quotable.io/random";
const quote = document.querySelector('blockquote');

async function getquote(url) {
    const response = await fetch(url);
    let data = await response.json();
    // quote.innerText = data.content;
    console.log(data);
}

getquote(quoteAPI);
  





