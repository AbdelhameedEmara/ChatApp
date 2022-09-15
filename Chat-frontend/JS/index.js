
const loginBtn = document.getElementById("btn");
const checkBox = document.getElementById('remember');
const username = document.getElementById('username');

if(localStorage.getItem('username')!=null){
    username.value = localStorage.getItem('username');
}

loginBtn.addEventListener('click', ()=>{
         
    localStorage.setItem("username", username.value);
    if(checkBox.checked){
        localStorage.setItem("remember", 'true');
    } else {
        localStorage.setItem("remember", 'false');
    }
 
})

    

    
    

/////////////////////////////////////////////////


// var button = document.getElementsByClassName("right-sc");
// button.setAttribute("onclick", "chatPage();");
// function chatPage() {
// window.location.href = "chatapp.html";
// }


/////////////////////////////////////////////////////
function myfunction() {
    const loginForm =document.getElementById("login-form")
    
    loginForm.classList.toggle("show"); 
}

