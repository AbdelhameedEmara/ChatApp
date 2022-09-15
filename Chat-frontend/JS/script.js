const socket = io('http://localhost:8080');


// Using DOM to catch elements input and DIVs
const msgForm = document.getElementById('input-msg-form');
const msgInput = document.getElementById('msg-input');
const msgSpace = document.getElementById('chat-area');
const userList = document.getElementById('users-list');
const accountInfo = document.getElementById('account-info');
const username = document.getElementById('username');

// const user = prompt('Enter your name: ');
// Getting username from login form in the index.
const user = localStorage.getItem('username');
//Deleting username when the user uncheck remember me
if(localStorage.getItem('remember') === 'false'){
    localStorage.removeItem('remember');
    localStorage.removeItem('username');
}

// new user socket event fired
createAccount(user);
socket.emit('new-user', user);


// Sender socket chat message event 
socket.on('chat-msg', (data)=>{
    createSenderMessage(`${data.user}`, `${data.message}`);
    console.log(data.message);
})

// Receiver socket chat message event 
socket.on('chat-msg-return', (data)=>{
    createReceiverMessage(`${data.user}`, `${data.message}`);
    console.log(data.message);
})

// User connected successfully 
socket.on('user-connected', (user)=>{
    createUserMessage(`${user} Joind`);
})

// User disconnected successfully
socket.on('user-disconnected', (user)=>{
    createUserMessage(`${user} left`);
})

// Getting Messages from forms to send it to server
msgForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    const message = msgInput.value;
    socket.emit('send-chat-msg', message);
    msgInput.value = '';
})

/////////////////////////Messages Functions////////////////////////////////

// New User function
function createAccount(user) {
    username.innerHTML = user;
}

// Conntected and Disconnected users function
function createUserMessage(user){
    const userDiv = document.createElement('div');
    userDiv.classList.add('user');
    const userLink = document.createElement('a');
    const userImageSpan = document.createElement('span');
    userImageSpan.classList.add('user-img');
    const userImage = document.createElement('img');
    const userTitle = document.createElement('span');
    userTitle.classList.add('user-title');
    userTitle.innerHTML = user;
    userDiv.appendChild(userLink);
    userLink.appendChild(userImageSpan);
    userImageSpan.appendChild(userImage);
    userLink.appendChild(userTitle);
    userList.appendChild(userDiv);
}

// Sender messages Function
function createSenderMessage(user, message){
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('row');
    const messageDivInner = document.createElement('div');
    messageDivInner.classList.add('chat-bubble');
    const messageUser = document.createElement('div');
    messageUser.classList.add('message-user');
    const messageUserSpan = document.createElement('span');
    messageUserSpan.innerHTML = user;
    messageUser.appendChild(messageUserSpan);
    const messageText = document.createElement('div');
    messageText.classList.add('message-text');
    const messageTextSpan = document.createElement('span');
    messageTextSpan.innerHTML = message;
    messageText.appendChild(messageTextSpan);
    const messageTime = document.createElement('div');
    messageTime.classList.add('message-time');
    const messageTimeSpan = document.createElement('span');
    var d = new Date();
    messageTimeSpan.innerHTML = d.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit', hour12:true});
    messageTime.appendChild(messageTimeSpan);
    messageDivInner.appendChild(messageUser);
    messageDivInner.appendChild(messageText);
    messageDivInner.appendChild(messageTime);
    messageDiv.appendChild(messageDivInner);
    msgSpace.appendChild(messageDiv);
}


// Receiver Messages Function
function createReceiverMessage(user, message){
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('row');
    const messageDivInner = document.createElement('div');
    messageDivInner.classList.add('chat-bubble2');
    const messageUser = document.createElement('div');
    messageUser.classList.add('message-user');
    const messageUserSpan = document.createElement('span');
    messageUserSpan.innerHTML = user;
    messageUser.appendChild(messageUserSpan);
    const messageText = document.createElement('div');
    messageText.classList.add('message-text');
    const messageTextSpan = document.createElement('span');
    messageTextSpan.innerHTML = message;
    messageText.appendChild(messageTextSpan);
    const messageTime = document.createElement('div');
    messageTime.classList.add('message-time');
    const messageTimeSpan = document.createElement('span');
    var d = new Date();
    messageTimeSpan.innerHTML = d.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit', hour12:true});
    messageTime.appendChild(messageTimeSpan);
    messageDivInner.appendChild(messageUser);
    messageDivInner.appendChild(messageText);
    messageDivInner.appendChild(messageTime);
    messageDiv.appendChild(messageDivInner);
    msgSpace.appendChild(messageDiv);
}

///////////////////////////voice button handling //////////////////////////////
const result = document.getElementById('msg-input');
const voiceBtn = document.getElementById('voice-btn');

voiceBtn.addEventListener('click', startConverting)

function startConverting () {

    if('webkitSpeechRecognition' in window) {
        var speechRecognizer = new webkitSpeechRecognition();
        speechRecognizer.continuous = true;
        speechRecognizer.interimResults = true;
        speechRecognizer.lang = 'en-US';
        speechRecognizer.start();
  
        var finalTranscripts = '';
  
        speechRecognizer.onresult = function(event) {
            var interimTranscripts = '';
            for(var i = event.resultIndex; i < event.results.length; i++){
                var transcript = event.results[i][0].transcript;
                transcript.replace("\n", "<br>");
                if(event.results[i].isFinal) {
                    finalTranscripts += transcript;
                }else{
                    interimTranscripts += transcript;
                }
            }
            result.innerHTML = finalTranscripts + interimTranscripts;
        };
        speechRecognizer.onerror = function (event) {
  
        };
    }else {
        result.innerHTML = 'Your browser is not supported. Please download Google chrome or Update your Google chrome!!';
    }	
    }
     

/////////////////////////emoji handling////////////////////////////////
const emojiBtn = document.getElementById('emoji-btn');

emojiBtn.addEventListener('click', myFunction)

   //show&hide emoji

   function myFunction() {
    var x = document.getElementById('myDIV');
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }
  
  
    // getmyemoji 
  
  
      var i = 128512;
      var lastEmojiCode = 128700;
      var div = document.getElementById("myimoji");
  
      div.innerHTML = " ";
  
      for (i; i <= lastEmojiCode; i++) {
  
        div.innerHTML += "<span class='Emojis'>&#" + i + "</span>";
      }
      var Emojis = document.querySelectorAll(".Emojis");
  
      for (let i = 0; i <= Emojis.length - 1; i++) {
  
        Emojis[i].addEventListener('click', (e) => {
          document.querySelector("#msg-input").value += e.target.innerHTML;
        })
      }
  
  ////////////////////////////chat background/////////////////////////////
  const colorChoice0 = document.querySelector('#color-choice-0');
    const colorChoice1 = document.querySelector('#color-choice-1');
    // console.log(colorChoice1);
    const colorChoice2 = document.querySelector('#color-choice-2');
    // console.log(colorChoice2);
    const colorChoice3 = document.querySelector('#color-choice-3');
    // console.log(colorChoice3);
    
    const chatContainer = document.getElementsByClassName('chat-background');
    colorChoice0.addEventListener("click", function(){
        chatContainer[0].style.background = "#a5a5a5";
    })
    colorChoice1.addEventListener("click", function(){
        chatContainer[0].style.backgroundImage = "linear-gradient(to right, #ffecd2, #fcb69f)";
    })
    colorChoice2.addEventListener("click", function(){
        chatContainer[0].style.backgroundImage = "linear-gradient(to right, #2C3E50, #FD746C)";
    })
    colorChoice3.addEventListener("click", function(){
        chatContainer[0].style.backgroundImage = "linear-gradient(to right, #ff9a9e, #fecfef)";
    })
    