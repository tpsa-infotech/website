import {
    Box,
    Button,
    CloseButton,
    Container,
    Icon,
    Square,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
  } from '@chakra-ui/react'
  import * as React from 'react'
  import { FiInfo } from 'react-icons/fi'
  
  export default function banner() {
    const isMobile = useBreakpointValue({ base: true, md: false })
    const [showPopup, setShowPopup] = React.useState(false);

    const toggleShowInfoPopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <>
            {(() => {
                if (!showPopup) {
                return (
                    <Box bg="bg-surface" boxShadow={useColorModeValue('sm', 'sm-dark')}>
                        <Container py={{ base: '4', md: '2.5' }} position="relative">
                            <CloseButton display={{ sm: 'none' }} position="absolute" right="2" top="2" onClick={toggleShowInfoPopup}/>
                            <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            justify="space-between"
                            spacing={{ base: '3', md: '2' }}
                            >
                            <Stack
                                spacing="4"
                                direction={{ base: 'column', md: 'row' }}
                                align={{ base: 'start', md: 'center' }}
                            >
                                {!isMobile && (
                                <Square size="12" bg="bg-subtle" borderRadius="md">
                                    <Icon as={FiInfo} boxSize="6" />
                                </Square>
                                )}
                                <Stack
                                    direction={{ base: 'column', md: 'row' }}
                                    spacing={{ base: '0.5', md: '1.5' }}
                                    pe={{ base: '4', sm: '0' }}
                                >
                                    <Text fontWeight="medium">Get Notified</Text>
                                    <Text color="muted">Sign up for SMS notifications</Text>
                                </Stack>
                            </Stack>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                spacing={{ base: '3', sm: '2' }}
                                align={{ base: 'stretch', sm: 'center' }}
                            >
                                <Button variant="primary" isFullWidth>
                                Sign Up
                                </Button>
                                <CloseButton display={{ base: 'none', sm: 'inline-flex' }} onClick={toggleShowInfoPopup}/>
                            </Stack>
                        </Stack>
                        </Container>
                    </Box>
                );
                }
            })()}
        </>
    )
  }