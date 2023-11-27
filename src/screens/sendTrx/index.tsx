

import { Flex, Box, Input, Button, FormControl, FormLabel, Stack } from '@chakra-ui/react';

import { useState } from 'react';


import { useDebounce } from 'use-debounce'

import { parseEther } from 'viem'
import {
    usePrepareSendTransaction,
    useSendTransaction,
    useWaitForTransaction,
    WagmiConfig,
    useAccount
} from 'wagmi'


import { Wconfig } from '@/screens/Home';

export const PrepareTrx: React.FC = () => {

    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');

    const [debouncedTo] = useDebounce(to, 500)
    const [debouncedAmount] = useDebounce(amount, 500)

    const { config } = usePrepareSendTransaction({
        to: debouncedTo,
        value: debouncedAmount ? parseEther(debouncedAmount) : undefined,
    })
    const { data, sendTransaction } = useSendTransaction(config)

    const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash, })
    
    const { isConnected , address} = useAccount();

    return (
        <>  
            <Flex>
                { isConnected? (<>
                    connected : address {address}
                </>):('not connected')}
            </Flex>
            <Flex mt={5} >
                <form onSubmit={(e) => { e.preventDefault(); sendTransaction?.() }}>
                    <Stack spacing={4}>
                        <FormControl>
                            <FormLabel>Recipient</FormLabel>
                            <Input aria-label="Recipient" placeholder="0xBD...fcF0" onChange={(e) => setTo(e.target.value)} value={to} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Amount (ether)</FormLabel>
                            <Input aria-label="Amount (ether)" placeholder="0.0001" onChange={(e) => setAmount(e.target.value)}
                                value={amount}
                            />
                        </FormControl>
                        <Box>
                            <Button type="submit" colorScheme="teal" disabled={isLoading || !sendTransaction || !to || !amount}>
                                {isLoading ? 'Sending...' : 'Send'}
                            </Button>
                        </Box>

                        <Box>

                            {isSuccess && (
                                <div>
                                    Successfully sent {amount} ether to {to}
                                    <div>
                                        <a target='_blank' href={`https://goerli.etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                                    </div>
                                </div>
                            )}
                        </Box>
                    </Stack>
                </form>

            </Flex>
        </>)
}

export const SendTrx: React.FC = () => {
    return (
        <>
            <WagmiConfig config={Wconfig}>
                <PrepareTrx />
            </WagmiConfig>
        </>
    )
}