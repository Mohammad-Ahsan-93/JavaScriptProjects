// Getting DOM Elements
const main = document.getElementById('main');
const voiceSelect = document.getElementById('voices');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const customText = document.getElementById('text');
const readBtn = document.getElementById('read');
const customTextDiv = document.getElementById('custom-text');

// Array for Holding all images and text to be read
const data = [
    {
        image: './img/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: './img/drink.jpg',
        text: "I'm Thirsty"
    },
    {
        image: './img/food.jpg',
        text: "I'm Hungry"
    },
    {
        image: './img/grandma.jpg',
        text: "I want to go to Grandma's"
    },
    {
        image: './img/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: './img/home.jpg',
        text: "I want to go Home"
    },
    {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
    },
    {
        image: './img/outside.jpg',
        text: "I want to go outside"
    },
    {
        image: './img/sad.jpg',
        text: "I'm Sad"
    },
    {
        image: './img/scared.jpg',
        text: "I'm Scared"
    },
    {
        image: './img/school.jpg',
        text: "I want to go School"
    },
    {
        image: './img/tired.jpg',
        text: "I'm Tired"
    },
]

// Array for all Web Speech API Voices
let voicesBackup = [];

// Create a box for each object in the data array
data.forEach(createBox);

// All Functions
// 1. Function to create speech boxes
function createBox(imageObj) {
    const box = document.createElement('div');
    const { image, text } = imageObj;                   // Destructure Varaibles from Object
    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="imageInfo">${text}</p>
    `;
    box.addEventListener('click', () => {
        setMessage(text);
        speakText();
    })
    main.appendChild(box);                             // Append child is used to show Div at DOM 
}

// Initialize spech synthesis
const message = new SpeechSynthesisUtterance();

// 2. Function to get voices from Web speech API and put it in Array
function populateVoiceList() {
    if(typeof speechSynthesis === 'undefined') {
      return;
    }
    
    let voices = speechSynthesis.getVoices();
    voicesBackup = voices;

    for(var i = 0; i < voices.length; i++) {
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
      
      if(voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }

      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
  }

// 3. Set the text for speech synthesis
function setMessage(text) {
    message.text = text;
    console.log(message.text);
}

// 4. Speak the text
function speakText() {
    speechSynthesis.speak(message);
}

// 5. Function to set the new voice
function setVoice(e) {
    message.voice = voicesBackup.find( voice => voice.name === e.target.value)
    console.log(message.voice);
    console.log(voice.name);
}
  
// Execute populateVoiceList function
populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}



// Event Listners
// 1. Toggle Button
toggleBtn.addEventListener('click', () => {
    customTextDiv.classList.toggle('show');
}) 

// 2. Close Button in Custom Text Div
closeBtn.addEventListener('click', () => {
    customTextDiv.classList.remove('show');
}) 

// 3. Event Listner when changing voices
speechSynthesis.addEventListener('voiceschanged', populateVoiceList);
voiceSelect.addEventListener('change', setVoice);

// 4. Event listner for custom text
readBtn.addEventListener('click', () => {
    setMessage(customText.value);
    speakText();
})