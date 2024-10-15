// ConnectWallet.js
import React, { useEffect, useState } from 'react';
import { useTonConnect } from '../hooks/useTonConnect'; // Import your custom hook
import { TonConnectButton } from '@tonconnect/ui-react'; // Import TonConnectButton
import { useTonAddress } from '@tonconnect/ui-react';

const ConnectWallet = ({ setWallet }) => { // Accept setWallet as a prop
    const { connected, wallet, connectWallet } = useTonConnect(); // Destructure connectWallet
    const userFriendlyAddress = useTonAddress();

    useEffect(() => {
        if (connected && wallet) {
            setWallet(userFriendlyAddress)
        }
    }, [connected, wallet, setWallet]);

    return (
        <div className="custom-connect-wallet">
                <TonConnectButton className="connect-button" onClick={connectWallet} />
        </div>
    );
};

export default ConnectWallet;