import React, { useState } from 'react';
import Login from './components/Login.js';
import GameBoard from './components/GameBoard.js';
import './App.css'; // importuojate stilių

const App = () => {
    const [gameStarted, setGameStarted] = useState(false);

    return (
        <div className="app-container">
            {!gameStarted ? (
                <Login onStartGame={() => setGameStarted(true)} />
            ) : (
                <GameBoard />
            )}
        </div>
    );
};

export default App;