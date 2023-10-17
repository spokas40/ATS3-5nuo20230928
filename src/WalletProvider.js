import React, { createContext, useContext, useState } from 'react';

export const WalletContext = createContext();
export const WalletProvider = ({ children }) => {
    const [balance, setBalance] = useState(100); // keiskite pradinę reikšmę pagal jūsų poreikius

    const walletObject = {
        balance,
        setBalance,
    }

    return (
        <WalletContext.Provider value={ walletObject}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};