import React from "react";
 
const Footer= ({onNewGameClick, onSuggestClick,disabled}) => {
    return(
    <div className="panel footer">
        <button onClick={onNewGameClick}>New Game</button>
        <button onClick={onSuggestClick} disabled={disabled}>Suggest</button>
    </div>
    );
};
export default Footer;