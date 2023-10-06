import React from "react";

function PlayerWallet({ balance }) {
    return (
        <div className="playerWallet">
            In the Wallet: {balance} Travelons
        </div>
    );
}

export default PlayerWallet;