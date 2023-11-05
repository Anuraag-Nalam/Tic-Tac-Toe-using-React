export default function Log({ turns }) {
    //Print the array of turns, dynamic array which grows in size. The information on which button was clicked is generated in the gameBoard component, hence we need to lift the state up (App.jsx file)
    return <ol id="log">
        {turns.map(turn => (
            // key can be used to uniquely identify the element in the log and it is not mandatory but it is better practice to use it
            < li key={`${turn.square.row}${turn.square.col}`} > {turn.player} selected {turn.square.row}, {turn.square.col}</li>
        ))
        }
    </ol >
}