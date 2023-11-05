import { useState } from "react"
export default function Player({ name, symbol, isActive, onnameChange }) {
    const [playerName, setPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);
    function clickHandler() {
        //setIsEditing(isEditing?false:true);
        //In react when you are updating a state based on the previous value of the state, you should pass a function to the state updating function. This arrow function will automatically get the current state value as the input. The states are updated after a small period of time in future as per react behaviour. 
        setIsEditing((editing) => !editing);
        if(isEditing){onnameChange(symbol,playerName);}
    }
    function handleChange(event) {
        //onChange will provide us with the every value which is being entered in the input dialouge box. Basically it will return the event object. 
        setPlayerName(event.target.value);  
    }      
    return <>
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {/* This concept is called as two way binding as we are getting the value from the input (using onChange) and we are also feeding a value to the input (using value) {playerName} */}
                {isEditing ? <input type="text" value={playerName} onChange={handleChange}></input> : null}
                {/* we can actually lift the state of the playerName up to the app component to display the player name in the dialouge box. But for every keystroke, the app component will be re executed if we place this state in the app component and hence this is not recommended approach.  */}

                {!isEditing && <span className='player-name'>{playerName}</span>}
                {!isEditing && <span className='player-symbol'>{symbol}</span>}</span>
            <button onClick={clickHandler}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    </>
}