let btn = document.querySelector("#btn");
let content = document.querySelector("#content");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-IN";
    window.speechSynthesis.speak(text_speak);
}

function wish() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon");
    } else {
        speak("Good Evening");
    }
}
// window.addEventListener('load',()=>{
//      wish()
//  })

let speech_recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speech_recognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript);
};

let isListening = false;

btn.addEventListener("click", () => {
    recognition.start();
    isListening = true;
});

recognition.onend = () => {
    isListening = false;
};

function takeCommand(message) {
    let text = message.toLowerCase(); // Normalize to lowercase

    if (text.includes("hello") || text.includes("hey") || text.includes("hi")) {
        speak("Hello, what can I help you with?");
    } 
    else if (text.includes("who are you") || text.includes("what is your name")||text.includes("are you human")) {
        speak("I am riva, your virtual assistant created by muskan.");
    } 
    else if (text.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
    } 
    else if (text.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com/", "_blank");
    }
    else if (text.includes("play")) {
        let cleanedText = text.replace("riva", "").trim();
        let songName = cleanedText.split("play")[1]?.trim();
        if (songName && songName.length > 0) {
            speak(`Playing ${songName}`);
            window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(songName)}`, "_blank");
        } else {
            speak("Please tell me the name of the song.");
        }

    } else {
        speak(`This is what I found on the internet regarding ${text.replace("riva","")||text.replace("Riva","")}`);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(text)}`, "_blank");
    }
}
