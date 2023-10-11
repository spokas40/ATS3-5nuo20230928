import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../styles/styles.css';
import DiceRoller from './DiceRoller.js';
import CardMover from './CardMover.js';
import LoginContainer from './Login-container.js';
import BusinessBoard from './BusinessBoard.js';
import horseImage from '../images/horse.png';
import elephantImage from '../images/elephant-on-a-ball.png';
import carriageImage from '../images/carriage.png';
import ballonImage from '../images/ballon.png';
import { calculateNewPosition } from './CardMover.js';
import login from "./Login.js";
import PlayerWallet from "./PlayerWallet.js";
import TravelLandBank from './TravelLandBank.js'

const GameBoard = ({ deductFromWallet, depositToBank }) => {
    const [playerBalance, setPlayerBalance] = useState(100);
    const [bankBalance, setBankBalance] = useState(0);
    const selectedCard = localStorage.getItem('selectedCard');
    const [playerPosition, setPlayerPosition] = useState(0); // Pradinė žaidėjo kortelės pozicija
    const [diceValue, setDiceValue] = useState(0);

    function deductFromWallet (amount) {
        setPlayerBalance(prevBalance => prevBalance - amount);
    }

    function addToWallet(amount) {
        setPlayerBalance(prevBalance => prevBalance + amount);
    }


    function depositToBank (amount) {
        setBankBalance(prevBalance => prevBalance + amount)
    }

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
        const result = calculateNewPosition(playerPosition, diceValue);
        const newPosition = result.position;

        if (result.passedGo) {
            addToWallet(50); // Pridedame 50 Travelon'ų
        }

        moveCardToNewPosition(newPosition);
    };

    function handleCardLanding(cellValue) {
        switch (cellValue) {
            case "2":
            case "13":
                // Seaport
                deductFromWallet(2);
                depositToBank(2);
                break;

            case "4":
                // Seaport
                deductFromWallet(20);
                depositToBank(20);
                break;

            case "5":
                // Seaport
                deductFromWallet(10);
                depositToBank(10);
                break;

            case "10":
                // Hotel
                deductFromWallet(10);
                depositToBank(10);
                break;

            case "12":
                // Hotel
                deductFromWallet(20);
                depositToBank(20);
                break;

            case "3":
            case "11":
                // Railway Station
                deductFromWallet(3);
                depositToBank(3);
                break;

            case "15":
                // Railway Station
                deductFromWallet(20);
                depositToBank(20);
                break;

            // Čia bus pridedamos kitos sąlygos atitinkančios kitus žaidimo lentos langelius ir jų taisykles.
            default:
                break;
        }
    }


    const moveCardToNewPosition = (newPosition) => {
        handleCardLanding(newPosition.toString());
        if (newPosition === 18 && playerPosition < 18) {
            addToWallet(50); // Pridedame 50 Travelon'ų kai žaidėjas baigia ratą
        }
        setPlayerPosition(newPosition);

        const oldPositionElement = document.querySelector(`[data-value="${playerPosition}"]`);
        if (oldPositionElement) {
            oldPositionElement.innerHTML = '';
        }

        const gameBoardElement = document.querySelector(`[data-value="${newPosition}"]`);

        // Sukuriame naują div elementą, kuriame yra CardMover komponentas
        const cardMoverContainer = document.createElement("div");
        ReactDOM.render(
            <CardMover
                selectedCard={selectedCard}
                diceValue={diceValue}
                currentPosition={newPosition}
                onCardMove={moveCardToNewPosition}
                renderSelectedCardImage={renderSelectedCardImage}
            />,
            cardMoverContainer
        );

        // Išvalome senąjį turinį žaidimo lentoje ir įterpiame naują kortelės turinį
        gameBoardElement.innerHTML = '';
        gameBoardElement.appendChild(cardMoverContainer);
    };

    return (
        <div className="game-board-container">
            <h2>Game board</h2>
            <div className="game-board">
                <div className="grid">
                    {/* 1st row */}
                    <div className="cell cell-with-border government" data-value="1">                                       </div>
                    <div className="cell cell-with-border seaPort" data-value="2"></div>
                    <div className="cell cell-with-border rialWayStation" data-value="3"></div>
                    <div className="cell cell-with-border warehause" data-value="4"></div>
                    <div className="cell cell-with-border campingEquipment" data-value="5"></div>
                    <div className="cell cell-with-border" data-value="6"></div>
                    <div className="cell cell-with-border" data-value="7"></div>

                    {/* 2nd row */}
                    <div className="cell cell-with-border bankBuild" data-value="18"></div>
                    <div className="cell" data-value="100">
                        <TravelLandBank balance={bankBalance} depositToBank={depositToBank} />
                    </div>
                    <div className="cell" data-value="101">
                        <PlayerWallet balance={playerBalance} deductFromWallet={deductFromWallet} addToWallet={addToWallet} />
                    </div>
                    <div className="cell" data-value="102">
                        <BusinessBoard playerBalance={playerBalance} deductFromWallet={deductFromWallet} depositToBank={depositToBank} />
                    </div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell cell-with-border" data-value="8"></div>

                    {/* 3rd row */}
                    <div className="cell cell-with-border" data-value="17"></div>
                    <div className="cell" data-value="0"></div>
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
                    <div className="cell cell-with-border repairWorkshop" data-value="15"></div>
                    <div className="cell cell-with-border" data-value="14"></div>
                    <div className="cell cell-with-border seaPort" data-value="13"></div>
                    <div className="cell cell-with-border arab-bazar" data-value="12"></div>
                    <div className="cell cell-with-border rialWayStation" data-value="11"></div>
                    <div className="cell cell-with-border hotel" data-value="10"></div>
                </div>
            </div>
            <button className="backToHome" onClick={handleBackToHome}>Back to Home</button>
        </div>
    );
};

export default GameBoard;