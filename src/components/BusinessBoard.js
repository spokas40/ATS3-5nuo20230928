import React, { useState } from 'react';

const BusinessBoard = ({ playerBalance, deductFromWallet, depositToBank }) => {
    const [currentBusiness, setCurrentBusiness] = useState(null);

    const buyBusiness = (businessValue) => {
        if (playerBalance >= businessValue) {
            deductFromWallet(businessValue);
            depositToBank(businessValue);
            setCurrentBusiness({
                ...currentBusiness,
                owned: true
            });
        }
    }

    const sellBusiness = (businessValue) => {
        // čia bus pridedama logika verslo pardavimui
    }

    return (
        <div>
            {currentBusiness ? (
                <>
                    <p>The business is sold for: {currentBusiness.value} Travelons.</p>
                    <p>The business owner pays {currentBusiness.feePercentage}% of the income for the guests.</p>
                    {currentBusiness.owned ? (
                        <button onClick={() => sellBusiness(currentBusiness.value)}>I want to sell the business</button>
                    ) : (
                        <button onClick={() => buyBusiness(currentBusiness.value)}>Buy this business</button>
                    )}
                </>
            ) : <p>Select a business to view details.</p>}
        </div>
    );
}

export default BusinessBoard;