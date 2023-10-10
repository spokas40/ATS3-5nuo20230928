import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/styles.css';
import horseImage from '../images/horse.png';
import elephantImage from '../images/elephant-on-a-ball.png';
import carriageImage from '../images/carriage.png';
import ballonImage from '../images/ballon.png';
import GameBoard from './GameBoard.js';

const LoginContainer = () => {
    const savedCard = localStorage.getItem('selectedCard');
    const [selectedCard, setSelectedCard] = useState(savedCard || null);
    const [gameStarted, setGameStarted] = useState(false);

    const handleCardClick = (cardName) => {
        setSelectedCard(cardName);
        localStorage.setItem('selectedCard', cardName);
    };

    const startGame = () => {
        if (selectedCard) {
            setGameStarted(true);
        } else {
            alert("You haven't chosen a travel method yet!");
        }
    };

    return (
        <div className="login-container">
            {gameStarted ? (
                <GameBoard selectedCard={selectedCard} />
            ) : (
                <React.Fragment>
            <h2>Welcome to our game!</h2>
            <h1>"Business Way"</h1>
            <p>Please choose one of the four playing cards:</p>
            <div className="card-row">
                <div className={`card ${selectedCard === "hors" ? "selected" : ""}`} onClick={() => handleCardClick("hors")}>
                    <img className="cardsPicture" src={horseImage} alt="hors" />
                </div>
                <div className={`card ${selectedCard === "elephant" ? "selected" : ""}`} onClick={() => handleCardClick("elephant")}>
                    <img className="cardsPicture" src={elephantImage} alt="elephant" />
                </div>
                <div className={`card ${selectedCard === "carriage" ? "selected" : ""}`} onClick={() => handleCardClick("carriage")}>
                    <img className="cardsPicture" src={carriageImage} alt="carriage" />
                </div>
                <div className={`card ${selectedCard === "ballon" ? "selected" : ""}`} onClick={() => handleCardClick("ballon")}>
                    <img className="cardsPicture" src={ballonImage} alt="ballon" />
                </div>
            </div>
                <button className="startGame" onClick={startGame}>Start the Game</button>
                </React.Fragment>
                )}
        </div>
    );
};

export default LoginContainer;