import React, { useState } from "react";

function PlayerWallet({ balance, deductFromWallet, addToWallet }) {
    const [playerBalance, setPlayerBalance] = useState(0); // Prielaidžiu, kad turite tokį būsenos kintamąjį

    function deductFromWallet(amount) {
        setPlayerBalance(prevBalance => prevBalance - amount);
    }

    function addToWallet(amount) {
        setPlayerBalance(prevBalance => prevBalance + amount);
    }
    return (
        <div className="playerWallet">
            In the Wallet: {balance} Travelons
        </div>
    );
}

export default PlayerWallet;