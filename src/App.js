import React, { useState } from 'react';
import Login from './components/Login.js';
import GameBoard from './components/GameBoard.js';
import PlayerWallet from './components/PlayerWallet.js';
import { WalletProvider } from './WalletProvider.js'
import './App.css'; // importuojame stilių

const App = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [playerBalance, setPlayerBalance] = useState(100); // pradinis balansas gali būti bet koks

    const handleBalanceChange = (newBalance) => {
        console.log(newBalance); // atliekami veiksmai su nauju balansu, pvz., atnaujinti būseną
    };

    return (
        <WalletProvider> {/* Įkeliami visi programos turinio komponentai į WalletProvider */}
            <div className="app-container">
                {!gameStarted ? (
                    <Login onStartGame={() => setGameStarted(true)} />
                ) : (
                    <PlayerWallet balance={playerBalance} onBalanceChange={handleBalanceChange}>
                        <GameBoard />
                    </PlayerWallet>
                )}
            </div>
        </WalletProvider>
    );
};

export default App;
