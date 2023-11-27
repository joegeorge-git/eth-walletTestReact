import {
    WagmiConfig, createConfig, configureChains,
    useEnsName, useAccount
} from 'wagmi';

import {goerli} from "viem/chains";

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { Flex , Button } from '@chakra-ui/react';

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [goerli],
    [alchemyProvider({ apiKey: 'XASHhmfCNO2kR09C06A5zlZSjoIGq7Ts' }), publicProvider()],
)
export const Wconfig = createConfig({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
        new CoinbaseWalletConnector({
            chains,
            options: {
                appName: 'wagmi',
            },
        }),
        new WalletConnectConnector({
            chains,
            options: {
                projectId: '...',
            },
        }),
        new InjectedConnector({
            chains,
            options: {
                name: 'Injected',
                shimDisconnect: true,
            },
        }),
    ],
    publicClient,
    webSocketPublicClient,
})

export const HomeScreen: React.FC = () => {
    return (
        <>
            <WagmiConfig config={Wconfig}>
                <Profile />
            </WagmiConfig>
        </>
    )
}

import { useConnect , useDisconnect} from 'wagmi';

useDisconnect;

export function Profile() {
    const { address, connector, isConnected } = useAccount();

    const { data: ensName } = useEnsName({ address })
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
    const disconnect : any = async () => {
        console.log('disconnect');
    }


    return (

        <div>
            {
                isConnected ? (<div>
                    <div>{ensName ? `${ensName} (${address})` : address}</div>
                    <div>Connected to {connector?.name}</div>
                    <Button colorScheme={'red'}  onClick={()=>disconnect()}>Disconnect</Button>
                </div>) : ('Not connected')

            }
            <Flex direction={'column'}  mt={10}>
                {connectors.map((connector) => (
                    <Button
                        disabled={!connector.ready}
                        key={connector.id}
                        onClick={() => connect({ connector })}
                        mt={3}
                    >
                        {connector.name}
                        {!connector.ready && ' (unsupported)'}
                        {isLoading &&
                            connector.id === pendingConnector?.id &&
                            ' (connecting)'}
                    </Button>
                ))}
            </Flex>


            {error && <div>{error.message}</div>}


        </div>
    )
}