import React, {useEffect, useState}from "react";
import GameCircle from "./GameCircle";
import { isWinner,isDraw,getComputerMove } from "../helper";
import Header from "./Header";
import Footer from "./Footer";
import '../Game.css';
import {GAME_STATE_PLAYING,GAME_STATE_WIN, NO_PLAYER ,PLAYER_1, PLAYER_2, NO_CIRCLES, GAME_STATE_DRAW} from "../constants"
const GameBoard  = () => {

const [gameBoard,setGameBoard]= useState(Array(16).fill(NO_PLAYER));
const [currentPlayer, setCurrentPlayer]= useState(PLAYER_1);
const [gameState, setGameState]=useState(GAME_STATE_PLAYING);
const [winPlayer,setwinPlayer]=useState(NO_PLAYER);
 
useEffect (() => {
  initGame();
}, []);

const initGame = () => {
  console.log('init game');
  setGameBoard(Array(16).fill(NO_PLAYER));
  setCurrentPlayer(PLAYER_1);
  setGameState(GAME_STATE_PLAYING);
}

const initBoard = () => {
  const circles= [];
  for( let i =0 ;i< NO_CIRCLES;i++){
 circles.push(rendrCircle(i));
}
return circles;
}
const suggestMove = () => {
  circleClicked(getComputerMove(gameBoard));
}


console.log(gameBoard);
 


  const circleClicked=(id) => {
    console.log("circle Clicked:" + id );
    
    if(gameBoard[id]!== NO_PLAYER) return;
    if(gameState!== GAME_STATE_PLAYING) return;


    if(isWinner(gameBoard, id,currentPlayer)) {
      setGameState (GAME_STATE_WIN) ;
      setwinPlayer( currentPlayer);
    }

    if(isDraw (gameBoard, id,currentPlayer)) {
      setGameState(GAME_STATE_DRAW) ;
      setwinPlayer(NO_PLAYER);
    }


    setGameBoard( prev => {

      return prev.map((circle,pos)=> {
        if(pos === id) return currentPlayer;
        return circle;
      })
    })
    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1)
    console.log(gameBoard);
    console.log(currentPlayer); 
  }
  const rendrCircle= id => {
    return <GameCircle key ={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClicked} />
  }

 
    return (
      <>
      <Header gameState={gameState} currentPlayer ={currentPlayer} winPlayer={winPlayer}/>
    <div className="gameBoard">
    {initBoard()};
    </div>
    <Footer onNewGameClick ={initGame} onSuggestClick={suggestMove}/>
    </>
    )
}
export default GameBoard;