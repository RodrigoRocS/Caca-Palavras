const arrayWords = ["KAKASHI", "NARUTO", "SASUKE", "KONOHA", "KURAMA"];
let wordSelected = "";

const saveGame = () => {
  const matriz = document.querySelector(".matriz");
  localStorage.setItem("matrizKey", matriz.innerHTML);

  const listItens = document.querySelector("ul");
  localStorage.setItem("listKey", listItens.innerHTML);
};

const loadGame = () => {
  const matriz = document.querySelector(".matriz");
  matriz.innerHTML = localStorage.getItem("matrizKey");

  const listItens = document.querySelector("ul");
  listItens.innerHTML = localStorage.getItem("listKey");

  const cells = document.querySelectorAll('.cell');
  for (let index = 0; index < cells.length; index += 1) {
    cells[index].addEventListener('click', paintCell);
  }
};

const paintCell = (event) => {
  wordSelected += event.target.innerText;
  event.target.classList.add("selected");
  const li = document.querySelectorAll("li");
  for (let index = 0; index < li.length; index += 1) {
    if (wordSelected == li[index].innerText) {
      const selected = document.querySelectorAll(".selected");
      for (let index2 = 0; index2 < selected.length; index2 += 1) {
        selected[index2].classList.remove("selected");
        selected[index2].classList.add("found");
      }
      li[index].classList.add("liFound");
      wordSelected = "";
    }
  }
  saveGame();
};

const generateCells = () => {
  const matriz = document.querySelector(".matriz");
  for (let index = 0; index < 10; index += 1) {
    const line = document.createElement("div");
    line.className = "line";
    matriz.appendChild(line);
    for (let index1 = 0; index1 < 10; index1 += 1) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.addEventListener("click", paintCell);
      line.appendChild(cell);
    }
  }
};

const addWords = () => {
  const lines = document.querySelectorAll(".line");
  const indexLine = Math.floor(Math.random() * lines.length);
  const indexWord = Math.floor(Math.random() * arrayWords.length);
  const word = arrayWords[indexWord];
  const cells = lines[indexLine].querySelectorAll(".cell");
  const indexCell = Math.floor(
    Math.random() * (cells.length - word.length + 1)
  );

  for (let index = 0; index < word.length; index += 1) {
    cells[indexCell + index].innerText = word[index];
  }
  lines[indexLine].className = "lineOk";
  arrayWords.splice(indexWord, 1);
};

const randomLetters = () => {
  const cell = document.querySelectorAll(".cell");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let index = 0; index < cell.length; index += 1) {
    if (cell[index].innerText === "") {
      const letter = letters.charAt(Math.floor(Math.random() * letters.length));
      cell[index].innerText = letter;
    }
  }
};

const addList = () => {
  const ul = document.querySelector("ul");
  for (let index = 0; index < arrayWords.length; index += 1) {
    const li = document.createElement("li");
    li.innerText = arrayWords[index];
    ul.appendChild(li);
  }
};

const clear = () => {
  const btnClear = document.querySelector(".btn-clear");
  btnClear.addEventListener("click", () => {
    const selected = document.querySelectorAll(".cell");
    for (let index = 0; index < selected.length; index += 1) {
      selected[index].classList.remove("selected");
    }
    wordSelected = "";
  });
};

const startGame = () => {
  if (localStorage.getItem("matrizKey")) {
    loadGame();
    clear();
  } else {
    generateCells();
    addList();
    for (let index = arrayWords.length; index > 0; index -= 1) {
      addWords();
    }
    randomLetters();
    clear();
  }
};
startGame();
