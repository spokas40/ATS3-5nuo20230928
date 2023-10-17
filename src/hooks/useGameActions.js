import { useState, useContext } from 'react';

function useGameActions() {
    const [ownedBusinesses, setOwnedBusinesses] = useState([]); // kai naudojame vietinę būseną

    const buyBusiness = (business) => {
        // Logika verslo įsigyjimui
    };

    const sellBusiness = (business) => {
        // Logika verslo pardavimui
    };

    return { buyBusiness, sellBusiness, ownedBusinesses };
}

export default useGameActions;