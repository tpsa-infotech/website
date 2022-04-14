import { Box, Flex, Heading, Text, Center } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';



function Error({ statusCode }) {
    return (
        <Center height={'60vh'}>
            <Box textAlign="center" py={10} px={6}>
                <Box display="inline-block">
                    <Flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    bg={'red.500'}
                    rounded={'50px'}
                    w={'55px'}
                    h={'55px'}
                    textAlign="center">
                    <CloseIcon boxSize={'20px'} color={'white'} />
                    </Flex>
                </Box>
                <Heading as="h2" size="xl" mt={6} mb={2}>
                    Error
                </Heading>
                <Text color={'gray.500'}>
                    An error occurred.
                </Text>
            </Box>
        </Center>
    )
}

export default Error