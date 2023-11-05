import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winningCombinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]
function deriveActive(gameTurns) {
  let currentPlayer = 'X';
  //Getting the state based on the current gameTurns array, the array will be empty initially and hence the starting condition. 
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  } return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState(
    {
      X: 'Player 1',
      O: 'Player 2'
    }
  )
  

  //Already the activePlayer value is there in the state in which the gameTurns was updating. Hence, no need to create another state.  
  //const [activePlayer, setActivePlayer] = useState('X');
  //whenever a square is selected, we will add a new turn into the gameTurns array.

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActive(gameTurns);
  let winner = null;
  //reference types
  let gameBoard = [...initialGameBoard].map((insideArray) => [...insideArray]);
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    //here we are directly updating the initialGameBoard, because arrays are of reference types. Hence, we need to update the values in new array instead of modifying the original one. 
    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column]
    const secondSquare = gameBoard[combination[1].row][combination[1].column]
    const thirdSquare = gameBoard[combination[2].row][combination[2].column]

    if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = players[thirdSquare];
    }
  }

  //when winner is null, then there is draw
  const drawGame = gameTurns.length === 9 && !winner;
  function handleRestart() {
    setGameTurns([]);
  }


  function handleSelectSquare(rowIndex, colIndex) {

    //Old state is recieved automatically here. Instead of directly updating the variable, we are using the arrow function here as state updation will take some time and it might not get the previous state correctly. 


    //Interchange of players will occur over here. 
    //Removed this as we are using state again, same functionality is defined in deriveActive
    //setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns(prevGameTurns => {
      //appending the latest log initially and then using spread operator to fetch the earlier elements
      //The below mentioned approach is not recommended because we are merging two states, we are updating activePlayer in the gameTurns state. we dont know whether we are getting the latest state (of activePlayer) or not or whether the value is getting updated or not and hence we will do it manually 
      //const updatedTurns = [{square: { row: rowIndex, col: colIndex },player:activePlayer}, ...prevGameTurns]      
      const currentPlayer = deriveActive(prevGameTurns);
      const updatedTurns = [{
        square: { row: rowIndex, col: colIndex },
        player: currentPlayer
      }, ...prevGameTurns]
      return updatedTurns;
    })

  }
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {     
        ...prevPlayers,   
        [symbol]: newName,
        
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        {/* PLAYERS */}
        <ol id="players" className="highlight-player">
          <Player name={players['X']} symbol="X" isActive={activePlayer === 'X'}  onnameChange={handlePlayerNameChange}/>
          <Player name={players['O']} symbol="O" isActive={activePlayer === 'O'} onnameChange={handlePlayerNameChange}/>
        </ol>
        {(winner || drawGame) && <GameOver onRestart={handleRestart} winner={winner} />}
        {/* GAMEBOARD */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      {/* LOG */}
      <Log turns={gameTurns} />
    </main>

  )
}

export default App
