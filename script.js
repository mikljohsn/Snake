"use strict";

window.addEventListener("load", start);

// ******** CONTROLLER ********

function start() {
  console.log(`Javascript kører`);

  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);

  // start ticking
  tick();
}

function keyDown(event) {
  console.log(event.key);
  switch (event.key) {
    case " ": // space
      controls.stop = true;
      break;
    case "a":
      controls.left = true;
      break;
    case "d":
      controls.right = true;
      break;
    case "w":
      controls.up = true;
      break;
    case "s":
      controls.down = true;
      break;
    case "ArrowLeft":
      controls.left = true;
      break;
    case "ArrowRight":
      controls.right = true;
      break;
    case "ArrowUp":
      controls.up = true;
      break;
    case "ArrowDown":
      controls.down = true;
      break;
  }
}

function keyUp(event) {
  switch (event.key) {
    case "a":
      controls.left = false;
      controls.stop = false;
      break;
    case "d":
      controls.right = false;
      controls.stop = false; // set stop to false when right key is released
      break;
    case "w":
      controls.up = false;
      controls.stop = false;
      break;
    case "s":
      controls.down = false;
      controls.stop = false;
      break;
    case "ArrowLeft":
      controls.left = false;
      controls.stop = false;
      break;
    case "ArrowRight":
      controls.right = false;
      controls.stop = false;
      break;
    case "ArrowUp":
      controls.up = false;
      controls.stop = false;
      break;
    case "ArrowDown":
      controls.down = false;
      controls.stop = false;
      break;
  }
}

function tick() {
  // setup next tick
  setTimeout(tick, 100);


  //remove queue from model
  for (const part of queue) {
    writeToCell(part.row, part.col, 0);
  }

  //use controls object to move player

  if (controls.left) {
    direction = "left";
  } else if (controls.right) {
    direction = "right";
  } else if (controls.up) {
    direction = "up";
  } else if (controls.down) {
    direction = "down";
  } else if (controls.stop) {
    direction = "stop";
  }

  // create new head object
  const head = {
    row: queue[queue.length - 1].row,
    col: queue[queue.length - 1].col,
  }



  switch (direction) {
    case "left":
      head.col--;
      if (head.col < 0) {
        head.col = 9;
      }
      break;
    case "right":
      head.col++;
      if (head.col > 9) {
        head.col = 0;
      }
      break;
    case "up":
      head.row--;
      if (head.row < 0) {
        head.row = 9;
      }
      break;
    case "down":
      head.row++;
      if (head.row > 9) {
        head.row = 0;
      }
      break;
    case "stop": //stop player
      head.row = head.row;
      head.col = head.col;
      break;
  }


  //add new head to end of queue
  queue.push(head);

 /*  if(head !== goal){ //add new head to end of queue (food not implemented yet)
    queue.shift();
  } */

  //remove tail from queue
  queue.shift();

  //add queue to model
  for (const part of queue) {
    writeToCell(part.row, part.col, 1);
  }

  // display the model in full
  displayBoard();
}

// ******** MODEL ********
const model = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let direction;

const controls = {
  left: false,
  right: false,
  up: false,
  down: false,
  stop: false,
};


const queue = [
  {
    row: 5,
    col: 5
  },
  {
    row: 5,
    col: 6
  },
  {
    row: 5,
    col: 7
  },
];

function writeToCell(row, col, value) {
  model[row][col] = value;
}

function readFromCell(row, col) {
  return model[row][col];
}

// ******** VIEW ********

function displayBoard() {
  const cells = document.querySelectorAll("#grid .cell");
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const index = row * 10 + col;

      switch (readFromCell(row, col)) {
        case 0:
          cells[index].classList.remove("player", "goal");
          break;
        case 1: // Note: doesn't remove goal if previously set
          cells[index].classList.add("player");
          break;
        case 2: // Note: doesn't remove player if previously set
          cells[index].classList.add("goal");
          break;
      }
    }
  }
}
