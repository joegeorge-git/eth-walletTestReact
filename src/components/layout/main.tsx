import { Container } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


export interface ViewLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<ViewLayoutProps> = ({ children }) => {
    const location = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);
    return (
        <>
            <Container as="main" w={'100%'} maxW={'100%'} p={0} display="flex" flexDirection="column" alignItems="center">
                {children}
            </Container>
        </>
    );
};