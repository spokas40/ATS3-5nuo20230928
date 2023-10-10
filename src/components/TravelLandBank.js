import React, { useState } from "react";

function TravelLandBank({ balance, depositToBank }) {
    const [bankBalance, setBankBalance] = useState(0); // pradinis banko balansas
    function depositToBank(amount) {
        setBankBalance(prevBalance => prevBalance + amount);
    }

    // Funkcija skirta pridėti Travelonus į banką
    const addToBank = (amount) => {
        setBankBalance(prevBalance => prevBalance + amount);
    }

    return (
        <div className="travelLandBank">
            TravelLand Bank: {balance} Travelons
        </div>
    );
}

export default TravelLandBank;
