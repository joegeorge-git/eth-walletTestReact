
import { WagmiConfig, useSignMessage, } from 'wagmi';

import { Wconfig } from '@/screens/Home';
import { useEffect, useState } from 'react';
import { recoverMessageAddress } from 'viem'

export function SetUpSignMsgScreen() {

    const [recoveredAddress, setRecoveredAddress] = useState('');

    const { data: signMessageData, error, isLoading, signMessage, variables } = useSignMessage()
    
    recoveredAddress;error;isLoading;signMessage;

    useEffect(() => {
        (async () => {
            if (variables?.message && signMessageData) {
                const recoveredAddress = await recoverMessageAddress({ message: variables?.message, signature: signMessageData })
                setRecoveredAddress(recoveredAddress)
            }
        })()
    }, [signMessageData, variables?.message])
    return (
        <>
    
        </>
    )
}

export const SignMsgScreen: React.FC = () => {
    return (
        <>
            <WagmiConfig config={Wconfig}>
                <SetUpSignMsgScreen></SetUpSignMsgScreen>
            </WagmiConfig>
        </>
    )
}
