import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export const calculateNewPosition = (currentPosition, diceValue) => {
    const newPosition = currentPosition + diceValue;
    if (newPosition > 18) {
        return {
            position: newPosition % 18,
            passedGo: true
        };
    }
    return {
        position: newPosition,
        passedGo: false
    };
}

const CardMover = ({ selectedCard, currentPosition, diceValue, onCardMove, renderSelectedCardImage }) => {
    const handleMoveCard = () => {
        const newPosition = calculateNewPosition(currentPosition, diceValue);
        console.log("Nauja kortelės padėtis", newPosition)
        onCardMove(newPosition);
    };


    return (
        <div>
            <div className={`card ${selectedCard}`} style={{ width: '70px', height: '50px', borderRadius: '25%' }}>
                {selectedCard && renderSelectedCardImage(selectedCard)}
            </div>
        </div>
    );
};

export default CardMover;