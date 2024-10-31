console.log("Hello Everyone");
// I'm creating a way to converting english written messages in binary numbers and binary numbers written message in english text

// Variables
const main = document.querySelector(".main");
const playGrounds = document.querySelectorAll(".playGround");
const switchBtns = document.querySelectorAll(".switchBtn");

function switchMode(modename) {
  for (const switchBtn of switchBtns) {
    switchBtn.classList.remove("active");
  }
  for (const playGround of playGrounds) {
    playGround.classList.remove("active-playGround");
  }
  event.currentTarget.classList.add("active");
  document.getElementById(modename).classList.add("active-playGround");
}

// Encoding logic start here
const encodeMainContainer = document.querySelector(".encodeMainContainer");
let encodeInputBox = document.getElementById("encodeInputBox");
const encodeBtn = document.getElementById("encodeBtn");

let para = document.createElement("p");
para.className = "para";
if (encodeMainContainer.children.length == 0) {
  para.innerText = "Start encoding your messages in binary digits.";
  encodeMainContainer.appendChild(para);
} else {
  encodeMainContainer.removeChild(para);
}

let textforEncode;

encodeInputBox.addEventListener("input", (e) => {
  textforEncode = e.target.value;
});

encodeBtn.addEventListener("click", () => {
  addMessage(textforEncode, "encode", "end");
  encodeInputBox.value = "";

  setTimeout(() => {
    addMessage(textforEncode, "encode");
  }, 2000);
});

// Decoding logic start here
const decodeMainContainer = document.querySelector(".decodeMainContainer");
const decodeInputBox = document.getElementById("decodeInputBox");
const decodeBtn = document.getElementById("decodeBtn");

let para2 = document.createElement("p");
para2.className = "para";
if (decodeMainContainer.children.length == 0) {
  para2.innerText =
    "Start decoding your messages from binary digits to messages.";
  decodeMainContainer.appendChild(para2);
} else {
  decodeMainContainer.removeChild(para2);
}

let textforDecode;

decodeInputBox.addEventListener("input", (e) => {
  textforDecode = e.target.value;
});

decodeBtn.addEventListener("click", () => {
  addMessage(textforDecode, "decode", "end");
  decodeInputBox.value = "";

  setTimeout(() => {
    addMessage(textforDecode, "decode");
  }, 2000);
});

// Reuseable Functions
function addMessage(message, mode, direction) {
  console.log(message, mode, direction);

  if (mode === "encode" && direction === "end") {
    encodeMainContainer.innerHTML += `
        <div class="messageBox flex end">
          <div class="message">
            <p>${message}</p>
          </div>
        </div>`;
  } else if ((mode === "encode" && !direction) || direction === "start") {
    encodeMainContainer.innerHTML += `
        <div class="messageBox ">
           <div class="message">
              <p id=${message}>${encodeToBinary(message)}</p>
            </div>
            <button class="btn d-none copyBtn" title="Copy">
                Copy
            </button>
        </div>`;
  } else if (mode === "decode" && direction === "end") {
    decodeMainContainer.innerHTML += `
        <div class="messageBox flex end">
          <div class="message">
            <p>${message}</p>
          </div>
        </div>`;
  } else if ((mode === "decode" && !direction) || direction === "start") {
    decodeMainContainer.innerHTML += `
    <div class="messageBox ">
       <div class="message">
          <p>${decodeFromBinary(message)}</p>
        </div>
        <button class="btn d-none copyBtn" title="Copy">
            Copy
        </button>
    </div>`;
  }
}

// Function to encode English text to binary
function encodeToBinary(text) {
  return text
    .split("") // Split text into characters
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0")) // Convert each character to binary
    .join(" "); // Join each binary value with a space
}

// Function to decode binary to English text
function decodeFromBinary(binary) {
  return binary
    .split(" ") // Split binary string by spaces
    .map((bin) => String.fromCharCode(parseInt(bin, 2))) // Convert each binary to a character
    .join(""); // Join characters to form the decoded text
}
