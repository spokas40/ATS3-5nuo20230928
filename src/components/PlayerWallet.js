import React, {useState} from "react";

function PlayerWallet() {
    const [balance, setBalance] = useState(100); // pradinis pinigų kiekis
    // pinigų kiekio padidinimo funkcija:
    const addTravelon = (amount) => {
        setBalance(prevBalance => prevBalance + amount);
    }

    return (
        <div className="plaerWallet">
            In the Wallet: {balance} Travelons
        </div>
    );
}

export default PlayerWallet;