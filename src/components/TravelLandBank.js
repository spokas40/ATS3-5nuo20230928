import React, { useState } from "react";

function TravelLandBank() {
    const [bankBalance, setBankBalance] = useState(0); // pradinis banko balansas

    // Funkcija skirta pridėti Travelonus į banką
    const addToBank = (amount) => {
        setBankBalance(prevBalance => prevBalance + amount);
    }

    return (
        <div className="travelLandBank">
            TravelLand Bank: {bankBalance} Travelons
        </div>
    );
}

export default TravelLandBank;
