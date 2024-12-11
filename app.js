const submit = document.querySelector('#submit');
const userName = document.querySelector('#name');
const greeting = document.querySelector('#greeting');
const nameQtn = document.querySelector('#name-qtn');
const home = document.querySelector('#home');
const time = document.querySelector('#time');
const dailyGoal = document.querySelector('#daily-goal');
const goalInput = document.querySelector('#goal-input');
const goalQtn = document.querySelector('#goal-qtn');
const goal = document.querySelector('#goal');
const tasks = document.querySelector('#tasks');
const taskPopUp = document.querySelector('#task-pop-up');
const salutation = document.querySelector('#salutation');
const newTask = document.querySelector('#new-task')
const inputNewTask = document.querySelector('#input-new-task');
const taskIntro = document.querySelector('#task-intro');
const toDoList = document.querySelector('#todo-list');
const toDo = document.querySelector('#to-do');
const addQuote = document.querySelector('#add-quote');
const addedQuote = document.querySelector('#added-quote');
const inputQuote = document.querySelector('#input-quote');

// const appState = {
//   name: ""
// };

// function saveAppState(state) {
//   localStorage.setItem("appState", JSON.stringify(state));
// }

// function loadAppState() {
//   const savedState = localStorage.getItem("appState");
//   return savedState ? JSON.parse(savedState) : { name: "" }; // Default state
// }

// appState = loadAppState();
// updateGreeting(appState.name);

submit.addEventListener('click', () => {
  nameQtn.style.display = 'none';
  home.style.display = 'grid';
  if (userName.value === '') {
    greeting.innerText = '!';
  } else greeting.innerText = `, ${userName.value}!`;
})

goal.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
      goalQtn.style.display = 'none';  
      dailyGoal.style.display = 'flex'; 
      goalInput.textContent = goal.value;
  }
})

tasks.addEventListener('click', () => { 
  if(taskPopUp.style.display === 'block') {
      taskPopUp.style.display = 'none';
  }
  else taskPopUp.style.display = 'block';
})

newTask.addEventListener('click', () => {
  newTask.style.display = 'none';
  inputNewTask.style.display = 'block'; 
})

inputNewTask.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && inputNewTask.value !== '') {
    taskIntro.style.display = 'none';  
    toDoList.style.display = 'block'; 
    const taskArr = [];
    taskArr.push(inputNewTask.value);
    for(let i = 0; i < taskArr.length; i++) {
        const newLI = document.createElement('li');
        const textNode = document.createTextNode(`${inputNewTask.value}`);
        const newCB = document.createElement('input');
        const deleteButton = document.createElement('button');
        
        newLI.classList.add('flex');
        newCB.type = 'checkbox';
        deleteButton.textContent = 'del';
        deleteButton.classList.add('task-button', 'space-left');
        newCB.id = `${inputNewTask.value}`;
        
        toDoList.appendChild(newLI);
        newLI.appendChild(newCB);
        newLI.appendChild(textNode);
        newLI.appendChild(deleteButton);

        newCB.addEventListener('change', () => {
          newLI.classList.toggle('done', newCB.checked);
          deleteButton.style.textDecoration = 'none';
        });

        deleteButton.addEventListener('click', () => {
          toDoList.removeChild(newLI);
        })
        console.log(taskArr)
    inputNewTask.value = '';
    }
  } 
})

// for time & greetings
function updateTime() {
  const hourMinute = {
    hour: '2-digit',
    minute: '2-digit'
  }
    const now = new Date();
    const currentTime = now.toLocaleTimeString('en-US', hourMinute);
    const arr = [...currentTime]
    const hour = arr.splice(0,2).join('');
    const amPM = arr.splice(4,6).join('');
    if (hour > 5 && hour !== 12 && amPM === 'AM') {
      salutation.innerText = 'Good morning';
    } else if ((hour === 12 && amPM === 'PM') || (hour >=1 && hour < 6 && amPM === 'PM') ) {
      salutation.innerText = 'Good afternoon';
    } else {
      salutation.innerText = 'Good evening';
    }
    time.textContent = currentTime.replace(/AM|PM/,'');
  }
  setInterval(updateTime, 1000);

// For Quotes API
const quoteAPI = "https://api.quotable.io/quotes/random?limit=2&maxLength=50";
const quoteBlock = document.querySelector('blockquote');
const quotesArr = [];

addQuote.addEventListener('click', () => {
  if (addedQuote.style.display === 'block') {
    addedQuote.style.display = 'none';
  } else {
    addedQuote.style.display = 'block';
  }
})

inputQuote.addEventListener('keypress', function(e) {
  if(e.key === 'Enter' && inputQuote.value !== '') {
    quotesArr.push(inputQuote.value);
    
    inputQuote.value = '';
  }
})

fetch(quoteAPI)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    data.forEach(function (individualQuotes) {
      quotesArr.push(individualQuotes.content)
    })
    const firstQuoteInfo = data[0];
    quoteBlock.innerText = `${firstQuoteInfo.content} - ${firstQuoteInfo.author}`;
    function quoteRandomizer() {
    idx =  Math.floor(Math.random() * quotesArr.length);
    const quoteInfo = quotesArr[idx];
    const author = data[idx];
    if(idx > (data.length-1)) {
      quoteBlock.innerText = `${quoteInfo}`; 
    } else {
    quoteBlock.innerText = `${quoteInfo} -${author.author}`;
    }
    }
    setInterval(quoteRandomizer, 3000)
   })
  .catch(error => {
    console.error('Error:', error);
  });

// For weather API
const apiKey = 'b8b06b2826767511329bc1e9a8ea7bcc';
const weatherAPI =`https://api.openweathermap.org/data/2.5/weather?q=Manila&units=metric&appid=${apiKey}`;
const temp = document.querySelector('#temp');

fetch(weatherAPI)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const tempDeg = data.main.temp;
    temp.innerText = `${tempDeg}°`;
 })
  .catch(error => {
    console.error('Error:', error);
  });


