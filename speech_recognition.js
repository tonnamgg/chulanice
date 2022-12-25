const texts1 = document.querySelector(".texts1");

window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition2 = new SpeechRecognition();
recognition2.interimResults = true;

let p5 = document.createElement("p");

recognition2.addEventListener("result", (e) => {
    texts1.appendChild(p5);
    const text2 = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

    p5.innerText = text2;
    
});

recognition2.addEventListener("end", () => {
    recognition2.start();
});

recognition2.start();