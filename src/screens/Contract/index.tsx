
import { Flex, Box, Input, Button, FormControl, FormLabel, Stack } from '@chakra-ui/react';


import { WagmiConfig, useAccount, usePrepareContractWrite, useContractWrite, useContractRead, useWaitForTransaction } from 'wagmi';
import { Wconfig } from '@/screens/Home';
import { useState } from 'react';

import { useDebounce } from 'use-debounce'

export const PrepareContract: React.FC = () => {

    const [contractAddrss, setcontractAddrss] = useState('0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2');
    const [contractMethod, setcontractMethod] = useState('mint');

    const [params, setparams] = useState('34000000');
    //const debouncedparams = useDebounce(params, 500);

    const { isConnected, address } = useAccount();
    const [debouncedcontractAddrss] = useDebounce(contractAddrss, 500);


    const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite(
        {
            address: debouncedcontractAddrss as `0x${string}`,
            abi: [
                {
                    name: contractMethod,
                    type: 'function',
                    stateMutability: 'nonpayable',
                    inputs: [], //{ internalType: 'uint32', name: 'tokenId', type: 'uint32' }
                    outputs: [],
                },
            ],
            functionName: contractMethod,
            args: [], // parseInt(debouncedparams)
            // enabled:false ,Boolean(debouncedparams)
        });

    const { data, error, isError, write } = useContractWrite(config)

    console.log(write);

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return (
        <>
            <Flex>
                {isConnected ? (<>
                    connected : address {address}
                </>) : ('not connected')}
            </Flex>
            <Flex mt={5} w={400}>
                <Stack spacing={4}>
                    <Box >
                        <FormControl>
                            <FormLabel>Contract</FormLabel>
                            <Input aria-label="Contract" placeholder="0xBD...fcF0" onChange={(e) => setcontractAddrss(e.target.value)} value={contractAddrss} />
                        </FormControl>
                        <br />
                        <FormControl>
                            <FormLabel>functionName</FormLabel>
                            <Input aria-label="functionName" placeholder="Method" onChange={(e) => setcontractMethod(e.target.value)} value={contractMethod} />
                        </FormControl>
                        <br />
                        <FormControl>
                            <FormLabel>Params</FormLabel>
                            <Input aria-label="Params" placeholder="Params" onChange={(e) => setparams(e.target.value)} value={params} />
                        </FormControl>
                    </Box>
                    <Box>
                        <Button type="submit" colorScheme="teal" disabled={!write || isLoading} onClick={() => write?.()} >
                            {isLoading ? 'Sending...' : 'Transact'}
                        </Button>
                    </Box>
                    <Box>
                        {isSuccess && (
                            <div>
                                Successfully Executed....
                                <div>
                                    <a target='_blank' href={`https://goerli.etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                                </div>
                            </div>
                        )}
                    </Box>
                    <Box>
                        {(isPrepareError || isError) && (
                            <div>Error: {(prepareError || error)?.message}</div>
                        )}
                    </Box>
                </Stack>
            </Flex>
        </>
    )
}

export const ContractTrx: React.FC = () => {
    return (
        <>
            <WagmiConfig config={Wconfig}>
                <PrepareContract></PrepareContract>
            </WagmiConfig>
        </>
    )
}



export const PrepareReadContract: React.FC = () => {
    const { isConnected, address } = useAccount();
    const [contractAddrss, setcontractAddrss] = useState('0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2');
    const [debouncedcontractAddrss] = useDebounce(contractAddrss, 500);

    const [contractMethod, setcontractMethod] = useState('balanceOf');

    const [params, setparams] = useState('0xBD579AB94d6a6aFD57f1a1926Df6cce05584fcF0');
    const debouncedparams = useDebounce(params, 500);

    debouncedparams;

    const { data, error: contractError, isError: isContractError } = useContractRead(
        {
            address: debouncedcontractAddrss as `0x${string}`,
            abi: [
                {
                    name: contractMethod, // The name of the read function in your contract
                    type: 'function',
                    stateMutability: 'view', // Indicate that this is a read-only function
                    inputs: [{ name: 'owner', type: 'address' }], // If your function takes arguments, specify them here
                    outputs: [{ name: 'balance', type: 'uint256' }], // Specify the return type
                },
            ],
            functionName: contractMethod, // Specify the function name again
            args: [params as `0x${string}`], // If your function takes arguments, specify them here 
        }
    );

    console.log(data , contractError , isContractError) 

    return (
        <>
            <Flex>
                {isConnected ? (<>
                    connected : address {address}
                </>) : ('not connected')}
            </Flex>
            <Stack spacing={4}>
                <Box >
                    <FormControl>
                        <FormLabel>Contract</FormLabel>
                        <Input aria-label="Contract" placeholder="0xBD...fcF0" onChange={(e) => setcontractAddrss(e.target.value)} value={contractAddrss} />
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel>Address</FormLabel>
                        <Input aria-label="Params" placeholder="Params" onChange={(e) => setparams(e.target.value)} value={params} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>functionName</FormLabel>
                        <Input aria-label="functionName" placeholder="Method" onChange={(e) => setcontractMethod(e.target.value)} value={contractMethod} />
                    </FormControl>
                    <br />
                </Box>
                <Box>
                    {(data) && (
                        <div>Data : {data.toString()} </div>
                    )}
                </Box>
            </Stack>


        </>
    )
}

export const ContractReadTrx: React.FC = () => {

    return (
        <>
            <WagmiConfig config={Wconfig}>
                <PrepareReadContract></PrepareReadContract>
            </WagmiConfig>
        </>
    )
}