import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// Sukuriame kontekstą, kuris bus naudojamas perduoti būseną ir funkcijas kitoms komponentėms
const WalletContext = createContext();

// Sukuriame pasirinktinį kablį, kad lengviau naudotis kontekstu kitose komponentėse
export function useWallet() {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
}

// Pagrindinis komponentas, kuris valdo ir teikia piniginės būseną
function PlayerWallet({ balance, onBalanceChange, children }) {
    // Lokalūs būsenos kintamieji ir atnaujinimo funkcijos
    const [playerBalance, setPlayerBalance] = useState(balance || 0);

    // Šis efektas reaguoja į išorinius balanso pakeitimus ir atnaujina vietinę būseną
    useEffect(() => {
        setPlayerBalance(balance);
    }, [balance]);

    // Funkcija, kuri atima sumą iš piniginės ir informuoja išorę apie pakeitimus
    const deductFromWallet = useCallback((amount) => {
        const newBalance = playerBalance - amount;
        setPlayerBalance(newBalance);
        onBalanceChange(newBalance);
    }, [playerBalance, onBalanceChange]);

    // Konteksto teikėjas su reikalingomis reikšmėmis ir funkcijomis
    return (
        <WalletContext.Provider value={{ playerBalance, deductFromWallet }}>
            <div className="playerWallet">
                {/* Atvaizduojame dabartinį balansą */}
                In the Wallet: {playerBalance} Travelons
                {/* Perduodame `deductFromWallet` funkciją visiems vaikams, kurie yra tinkami React elementai */}
                {React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { deductFromWallet });
                    }
                    return child;
                })}
            </div>
        </WalletContext.Provider>
    );
}

// Eksportuojame PlayerWallet, kad galėtume jį naudoti kitose dalyse programos
export default PlayerWallet;
