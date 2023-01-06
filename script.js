const arrayWords = ['LARANJA', 'PERA', 'GOIABA', 'UVA', 'MANGA'];

const generateCells = () => {
  const matriz = document.querySelector(".matriz");
  for (let index = 0; index < 10; index += 1) {
    const line = document.createElement("div");
    line.className = "line";
    matriz.appendChild(line);
    for (let index1 = 0; index1 < 10; index1 += 1) {
      const cell = document.createElement("div");
      cell.className = "cell";
      line.appendChild(cell);
    }
  }
};
generateCells();

const addWords = () => {
    const lines = document.querySelectorAll('.line');
    const indexLine = Math.floor(Math.random() * lines.length);
    const indexWord = Math.floor(Math.random() * arrayWords.length)
    const word = arrayWords[indexWord];
    const cells = lines[indexLine].querySelectorAll('.cell');
    const indexCell = Math.floor(Math.random() * (cells.length - word.length + 1));

    for (let index = 0; index < word.length; index += 1) {
        cells[indexCell + index].innerText = word[index]; 
    }
    lines[indexLine].className = 'lineOk';
    arrayWords.splice(indexWord, 1);
}

for (let index = arrayWords.length; index > 0; index -= 1) {
    addWords();
}
