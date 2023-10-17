import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/styles.css';
import dice1Image from '../images/dice1.png';
import dice2Image from '../images/dice2.png';
import dice3Image from '../images/dice3.png';
import dice4Image from '../images/dice4.png';
import dice5Image from '../images/dice5.png';
import dice6Image from '../images/dice6.png';

// sugeneruojam atsitiktinį kauliuko skaičių nuo 1 iki 6
const getRandomDiceValue = () => {
    return Math.floor(Math.random() * 6) + 1;
};

// parodom atitinkamą kauliuko paveikslėlį pagal reikšmę
const renderDiceImage = (diceValue) => {
    switch (diceValue) {
        case 1:
            return <img className="diceSide" src={dice1Image} alt="Dice 1" />;
        case 2:
            return <img className="diceSide" src={dice2Image} alt="Dice 2" />;
        case 3:
            return <img className="diceSide" src={dice3Image} alt="Dice 3" />;
        case 4:
            return <img className="diceSide" src={dice4Image} alt="Dice 4" />;
        case 5:
            return <img className="diceSide" src={dice5Image} alt="Dice 5" />;
        case 6:
            return <img className="diceSide" src={dice6Image} alt="Dice 6" />;
        default:
            return null;
    }
};

// Komponentas praplečiamas, kad būtų naudojamas 'useEffect' ir būsena 'rolling'
const DiceRoller = ({ onFinish }) => {
    const [diceValue, setDiceValue] = useState(null);
    const [rolling, setRolling] = useState(false); // Pridedame būseną 'rolling' - žymi, ar vyksta animacija

    // Pridedame 'useEffect', kuris stebės 'rolling' būsenos pokyčius ir pradės animaciją
    useEffect(() => {
        if (!rolling) {
            return;
        }

        // Panaudojame 'setTimeout', kad sukurtume animacijos vėlavimą
        const animationTimeout = setTimeout(() => {
            const randomNumber = getRandomDiceValue(); // funkciją gauti atsitiktinį skaičių
            // const randomNumber = 3
            setDiceValue(randomNumber);
            setRolling(false);
            onFinish(randomNumber); // Po animacijos kviečiama onFinish su reikšme
            // onFinish(3); // hardcodinta reikšmė
        }, 1500); // 1,5 sekundės animacija

        return () => clearTimeout(animationTimeout);
    }, [rolling, onFinish]);

    // Pridedame funkciją 'rollDice', kuri nustato 'rolling' būseną į 'true', kai mygtukas paspaudžiamas
    const rollDice = () => {
        setRolling(true);
    };

    return (
        <div>
            <button onClick={rollDice}>Roll the dice</button>
            {/* Pridedame div elementą su animacija ir 'dice-roll-animation' klase */}
            <div className={`dice-roll-animation ${rolling ? 'rolling' : ''}`}>
                {diceValue !== null && renderDiceImage(diceValue)} {/* funkciją atvaizduoti paveikslėlį */}
            </div>
        </div>
    );
};

export default DiceRoller;
