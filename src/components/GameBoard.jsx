
export default function GameBoard({ onSelectSquare, board }) {
    //we are not calling any state here, we are deriving state. we are computing the value of gameBoard from the parent gameTurns state. 
    


    //This useState is used to manage and update the gameBoard
    //const [gameBoard, setGameBoard] = useState(initialGameBoard);

    //This method will not preserve the order in which the button click happened. Hence, we are commenting this method. We used gameTurnsArray in the App.jsx file and indeed, we will pass that array to both log and Gameboard components (lifting the state up). Basically Log.jsx file needs to know which button was clicked and in order to know that, we are moving this function to App.jsx as it has control over both gameBoard and Log.jsx components. 

    //function handleSelectSquare(rowIndex, colIndex) {
    //here we need to upadte the gameboard based on the previous state of the gameBoard. 
    //Use angular brackets when there is jsx code to be returned inside the arrow function. Use flower brackets when we are returning a js. 

    //We can write something like this but it is not recommended as arrays are reference types. we need to make a copy of it first instead of mutating it directly. As, if we update directly, before even react executes the function completely, the value will be updated in the in-memory.

    // setGameBoard((prevGameBoard) => {
    //     prevGameBoard[rowIndex][colindex] = 'X';
    //     return prevGameBoard;
    // });
    //exeuting this function inside gameboard function which is defined outside gameboard function.
    //onSelectSquare();        

    // setGameBoard((prevGameBoard) => {
    //     //updating the array in immutable way. Tackling with child elements also. 
    //     const updatedBoard = [...prevGameBoard.map((innerArray) => {
    //         return [...innerArray]
    //     })]
    //     updatedBoard[rowIndex][colIndex] = activeSymbolRender;
    //     return updatedBoard;
    // });
    //}
    return (
        <ol id="game-board">
            {/* every list item needs a key value as an input and here we are passing the index of the elements */}
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {/* col value inside the array will be updated as the value when the button is clicked, now we can use arrow function as a parameter value to the onClick parameter. 
                        
                        This line over here states that we have the handleSelectSquare function under control, whih implies that if we write it without using arrow function, the behaviour will break because the function will get executed immediately and hence in order to avoid that we are wrapping it inside the arrow function. 
                        onClick={()=>onSelectSquare(rowIndex,colIndex)}
                        
                        */}
                        {row.map((playerSymbol, colIndex) => (<li key={colIndex}>
                            <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol!=null}>{playerSymbol}</button>
                        </li>))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}