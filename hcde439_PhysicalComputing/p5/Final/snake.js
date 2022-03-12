var serial; // variable to hold an instance of the serialport library
var portName = "COM3"; //rename to the name of your port
let dataarray = []; //some data coming in over serial!
var xPos = 0;

// the snake is divided into small segments, which are drawn and edited on each 'draw' call
let numSegments = 10;
let direction = "right";

const xStart = 0; //starting x coordinate for snake
const yStart = 250; //starting y coordinate for snake
const diff = 10; //base movement for the snake

let xCor = []; //array of xCor for each segment of the snake
let yCor = []; //array of yCor for each segment of the snake

let xFruit = 0; //x position of the fruit
let yFruit = 0; //y position of the fruit
let scoreElem; //Score variable

function setup() {
	serial = new p5.SerialPort(); // make a new instance of the serialport library
	serial.on("data", serialEvent); // callback for when new data arrives
	serial.list(); // list the serial ports
	serial.open(portName); // open a serial port

	//The rest of the setup code is from https://p5js.org/examples/interaction-snake-game.html
	// since it is not my code I am leaving the default documentation
	//I assume the scoreElem block sets up the score at the top of the screen
	//the canvas block sets up the canvas
	//and the for loop sets up the snake
	scoreElem = createDiv("Score = 0");
	scoreElem.position(20, 20);
	scoreElem.id = "score";
	scoreElem.style("color", "white");

	createCanvas(500, 500);
	frameRate(15);
	stroke(255);
	strokeWeight(10);
	updateFruitCoordinates();

	for (let i = 0; i < numSegments; i++) {
		xCor.push(xStart + i * diff);
		yCor.push(yStart);
	}
}

function draw() {
	background(0); // sets background color
	for (let i = 0; i < numSegments - 1; i++) {
		//runs loop over each segment of the snake
		line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]); //creates a line of the snake
	}
	updateSnakeCoordinates(); //calls function
	checkGameStatus(); //calls function
	checkForFruit(); //calls function
	sendCord(); //calls function
}

function sendCord() {
	//my own function for sending the coords back to the arduino to update the light square
	if (xCor[0] > 250 && yCor[0] > 250) {
		//checks to see if snake is in the botright quad of canvas
		serial.write("4"); //send the arduino "4"
	}
	if (xCor[0] < 251 && yCor[0] > 250) {
		//checks to see if snake is in the bot left quad of canvas
		serial.write("3"); //sends the arduino "3"
	}
	if (xCor[0] > 250 && yCor[0] < 251) {
		//checks to see if snake is in the top right quad of canvas
		serial.write("2"); //sends the arduino "2"
	}
	if (xCor[0] < 251 && yCor[0] < 251) {
		//checks to see if snake is in the top left quad of canvas
		serial.write("1"); //sends the arduino "1"
	}
}

function serialEvent() {
	//my own function for reading inputs from arduino
	if (serial.available()) {
		//checks to see if arduino is sending
		var datastring = serial.readLine(); // read in some serial
		var newarray; // makes empty localized variable
		try {
			newarray = JSON.parse(datastring); // can we parse the serial
		} catch (err) {
			print(err);
		}
		if (typeof newarray == "object") {
			//if parse was successful and parsed into object
			dataarray = newarray; //we set data to global variable
			//console.log(direction + dataarray);
			if (dataarray[0] > 700) {
				//checks to see if joystick is left
				if (direction !== "right") {
					//if snake not going right
					direction = "left"; //move snake left
					// console.log("going left" + dataarray); //print in console to help debug
				}
			}
			if (dataarray[0] < 400) {
				//checks to see if joystick is left
				if (direction !== "left") {
					//if snake not going left
					direction = "right"; //move snake right
					// console.log("going right" + dataarray);//print in console to help debug
				}
			}

			if (dataarray[1] > 700) {
				//checks to see if joystick is left
				if (direction !== "down") {
					//if snake not going down
					direction = "up"; //move snake up
					// console.log("going up" + dataarray);//print in console to help debug
				}
			}
			if (dataarray[1] < 400) {
				//checks to see if joystick is left
				if (direction !== "up") {
					//if snake not going up
					direction = "down"; //move snake down
					// console.log("going down" + dataarray);//print in console to help debug
				}
			}
		}
		//console.log("got back " + datastring);
	}
}

/*
	The rest of the code is copied from the snake p5 example found here
	https://p5js.org/examples/interaction-snake-game.html
	As it is not my code I have chosen to leave the default documentation

 The segments are updated based on the direction of the snake.
 All segments from 0 to n-1 are just copied over to 1 till n, i.e. segment 0
 gets the value of segment 1, segment 1 gets the value of segment 2, and so on,
 and this results in the movement of the snake.

 The last segment is added based on the direction in which the snake is going,
 if it's going left or right, the last segment's x coordinate is increased by a
 predefined value 'diff' than its second to last segment. And if it's going up
 or down, the segment's y coordinate is affected.
*/
function updateSnakeCoordinates() {
	for (let i = 0; i < numSegments - 1; i++) {
		xCor[i] = xCor[i + 1];
		yCor[i] = yCor[i + 1];
	}
	switch (direction) {
		case "right":
			xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
			yCor[numSegments - 1] = yCor[numSegments - 2];
			break;
		case "up":
			xCor[numSegments - 1] = xCor[numSegments - 2];
			yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
			break;
		case "left":
			xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
			yCor[numSegments - 1] = yCor[numSegments - 2];
			break;
		case "down":
			xCor[numSegments - 1] = xCor[numSegments - 2];
			yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
			break;
	}
}

/*
 I always check the snake's head position xCor[xCor.length - 1] and
 yCor[yCor.length - 1] to see if it touches the game's boundaries
 or if the snake hits itself.
*/
function checkGameStatus() {
	if (
		xCor[xCor.length - 1] > width ||
		xCor[xCor.length - 1] < 0 ||
		yCor[yCor.length - 1] > height ||
		yCor[yCor.length - 1] < 0 ||
		checkSnakeCollision()
	) {
		noLoop();
		const scoreVal = parseInt(scoreElem.html().substring(8));
		scoreElem.html("Game ended! Your score was : " + scoreVal);
	}
}

/*
 If the snake hits itself, that means the snake head's (x,y) coordinate
 has to be the same as one of its own segment's (x,y) coordinate.
*/
function checkSnakeCollision() {
	const snakeHeadX = xCor[xCor.length - 1];
	const snakeHeadY = yCor[yCor.length - 1];
	for (let i = 0; i < xCor.length - 1; i++) {
		if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
			return true;
		}
	}
}

/*
 Whenever the snake consumes a fruit, I increment the number of segments,
 and just insert the tail segment again at the start of the array (basically
 I add the last segment again at the tail, thereby extending the tail)
*/
function checkForFruit() {
	point(xFruit, yFruit);
	if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
		const prevScore = parseInt(scoreElem.html().substring(8));
		scoreElem.html("Score = " + (prevScore + 1));
		xCor.unshift(xCor[0]);
		yCor.unshift(yCor[0]);
		numSegments++;
		updateFruitCoordinates();
	}
}

function updateFruitCoordinates() {
	/*
    The complex math logic is because I wanted the point to lie
    in between 100 and width-100, and be rounded off to the nearest
    number divisible by 10, since I move the snake in multiples of 10.
  */

	xFruit = floor(random(10, (width - 100) / 10)) * 10;
	yFruit = floor(random(10, (height - 100) / 10)) * 10;
}
