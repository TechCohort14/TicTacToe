//Enter your Javascript code here. You must rename this file with your initials for your first name and last name.
// Example John Doe will be jdscript.js

// Instructions from https://www.codebrainer.com/blog/tic-tac-toe-javascript-game


/* Defines winning combinations as arrays, accounting for vertical, horizontal, and diagonal */ 

const PLAYER_X_CLASS = 'x'
const PLAYER_O_CLASS = 'circle'
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]


const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
let isPlayer_O_Turn = false



startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
	isPlayer_O_Turn = false		/*gets set in line 28, last line of declarations following array of winning combinations*/
	cellElements.forEach(cell => {
		cell.classList.remove(PLAYER_X_CLASS)	//removes X's from previous game
		cell.classList.remove(PLAYER_O_CLASS)	//removes O's from previous game
		cell.removeEventListener('click', handleCellClick)
		cell.addEventListener('click', handleCellClick, { once: true })
	})
	setBoardHoverClass()
	winningMessageElement.classList.remove('show')
}


/* determine what paramater "e" is and whether setBoardClass() should be returning a value? */
function handleCellClick(e) {
	const cell = e.target
	const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS //Saves player whose turn it is (X or O)
	placeMark(cell, currentClass)
	if (checkWin(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
		setBoardHoverClass()
	}
}


function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "It's a draw!"
        } else {
			winningMessageTextElement.innerText = `Player with ${isPlayer_O_Turn ? "O's" : "X's"} wins!`  //proper
			//winningMessageTextElement.innerText = 'Player with '${isPlayer_O_Turn ? "O's" : "X's"} 'wins!' //mine
			//winningMessageTextElement.innerText = 'Player with ${isPlayer_O_Turn ? "O's" : "X's"} wins!'  //old
		//found at <div id="winningMessageText">  message appears here  </div> in html
		}
		winningMessageElement.classList.add('show')
	}


	function isDraw() {
		return [...cellElements].every(cell => {
			return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)
		})
	}


function placeMark(cell, currentClass) {
	cell.classList.add(currentClass)
}

function swapTurns() {
	isPlayer_O_Turn = !isPlayer_O_Turn
}


function setBoardHoverClass() {
	boardElement.classList.remove(PLAYER_X_CLASS)
	boardElement.classList.remove(PLAYER_O_CLASS)
	if (isPlayer_O_Turn) {
		boardElement.classList.add(PLAYER_O_CLASS)
	} else {
		boardElement.classList.add(PLAYER_X_CLASS)
	}
}


function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}


