import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/styles.css';
import DiceRoller from './DiceRoller.js';
import CardMover from './CardMover.js';
import LoginContainer from './Login-container.js';
import horseImage from '../images/horse.png';
import elephantImage from '../images/elephant-on-a-ball.png';
import carriageImage from '../images/carriage.png';
import ballonImage from '../images/ballon.png';
import { calculateNewPosition } from './CardMover.js';

console.log("Gauta kauliuko reikšmė: ")

const GameBoard = (props) => {
    const selectedCard = localStorage.getItem('selectedCard');
    const [playerPosition, setPlayerPosition] = useState(0); // Pradinė žaidėjo kortelės pozicija
    const [diceValue, setDiceValue] = useState(0);

    const handleBackToHome = () => {
        localStorage.removeItem('selectedCard');
        window.location.reload();
    };
    const renderSelectedCardImage = (selectedCard) => {
        const cardStyle = {
            width: '70px',
            height: '50px',
            borderRadius: '25%',
        };

        switch (selectedCard) {
            case 'hors':
                return <img className="cardsPicture" src={horseImage} alt="horse" style={cardStyle} />;
            case 'elephant':
                return <img className="cardsPicture" src={elephantImage} alt="elephant" style={cardStyle} />;
            case 'carriage':
                return <img className="cardsPicture" src={carriageImage} alt="carriage" style={cardStyle} />;
            case 'ballon':
                return <img className="cardsPicture" src={ballonImage} alt="ballon" style={cardStyle} />;
            default:
                return null;
        }
    };

    const handleDiceRollFinish = (diceValue) => {
        console.log("Gauta kauliuko reikšmė:", diceValue )
        // Atnaujinam žaidėjo kortelės poziciją naudodami naują funkciją
        const newPosition = calculateNewPosition(playerPosition, diceValue);
        setPlayerPosition(newPosition);
    };

    return (
        <div className="game-board-container">
            <h2>Game board</h2>
            <div className="game-board">
                <div className="grid">
                    {/* 1st row */}
                    <div className="cell cell-with-border" data-value="1"></div>
                    <div className="cell cell-with-border" data-value="2"></div>
                    <div className="cell cell-with-border" data-value="3"></div>
                    <div className="cell cell-with-border" data-value="4"></div>
                    <div className="cell cell-with-border" data-value="5"></div>
                    <div className="cell cell-with-border" data-value="6"></div>
                    <div className="cell cell-with-border" data-value="7"></div>

                    {/* 2nd row */}
                    <div className="cell cell-with-border" data-value="18"></div>
                    <div className="cell" data-value="0">
                        <CardMover
                            selectedCard={selectedCard}
                            diceValue={diceValue}
                            currentPosition={playerPosition}
                            onCardMove={(newPosition) => setPlayerPosition(newPosition)}
                            renderSelectedCardImage={renderSelectedCardImage}
                        />
                    </div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell cell-with-border" data-value="8"></div>

                    {/* 3rd row */}
                    <div className="cell cell-with-border" data-value="17"></div>
                    <div className="cell"></div>
                    <div className="cell">
                        <div className="cell dice-cell">
                            <DiceRoller onFinish={handleDiceRollFinish} diceValue={diceValue} />
                        </div>
                    </div>
                    <div className="cell">
                    </div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell cell-with-border" data-value="9"></div>

                    {/* 4th row */}
                    <div className="cell cell-with-border" data-value="16"></div>
                    <div className="cell cell-with-border" data-value="15"></div>
                    <div className="cell cell-with-border" data-value="14"></div>
                    <div className="cell cell-with-border" data-value="13"></div>
                    <div className="cell cell-with-border" data-value="12"></div>
                    <div className="cell cell-with-border" data-value="11"></div>
                    <div className="cell cell-with-border" data-value="10"></div>
                </div>
            </div>
            <button className="backToHome" onClick={handleBackToHome}>Back to Home</button>
        </div>
    );
};

export default GameBoard;