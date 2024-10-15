// hooks/useTonConnect.js
import { CHAIN, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Address } from "ton-core";

export function useTonConnect() {
    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet();

    // Function to initiate the wallet connection
    const connectWallet = () => {
        tonConnectUI.connectWallet();
    };

    return {
        sender: {
            send: async (args) => {
                await tonConnectUI.sendTransaction({
                    messages: [
                        {
                            address: args.to.toString(),
                            amount: args.value.toString(),
                            payload: args.body ? args.body.toBoc().toString("base64") : null,
                        },
                    ],
                    validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
                });
            },
            address: wallet && wallet.account && wallet.account.address ? Address.parse(wallet.account.address) : undefined,
        },
        connected: !!(wallet && wallet.account && wallet.account.address), // Check if wallet is connected
        wallet: wallet && wallet.account ? wallet.account.address : null, // Wallet address
        network: wallet && wallet.account ? wallet.account.chain : null, // Network type
        connectWallet // Expose the connectWallet function
    };
}