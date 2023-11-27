// TopMenu.tsx
import React from 'react';
import { Flex, Box, Heading, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <Box as="header" position={'fixed'} w={'100%'} top={0} left={0} zIndex={10}>
      <Flex as="header" justifyContent={'space-between'} align={'flex-end'} padding={2} bg="teal.500" color="white">
        <Flex justify={'start'} py={'3'} >
          <Heading as="h2" size="md"> Sonic Eth </Heading>
        </Flex>
        <Flex>
          <Button colorScheme="teal" as={Link} to="/" mr={4} size="sm">Connect</Button>
          <Button colorScheme="teal" as={Link} to="/sendtrx" mr={4} size="sm">Send Trx</Button>
          <Button colorScheme="teal" as={Link} to="/contract-w" mr={4} size="sm">Contract - W</Button>
          <Button colorScheme="teal" as={Link} to="/contract-r" mr={4} size="sm">Contract - R</Button>
          <Button colorScheme="teal" as={Link} to="/sign" mr={4} size="sm">Sign </Button>
        </Flex>
      </Flex>
    </Box>
  );
};