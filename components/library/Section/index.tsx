import { Container, ContainerProps, useColorModeValue} from '@chakra-ui/react';


export const Section = ({children, ...props}: ContainerProps) => {
    return (
        <Container maxW={'6xl'} py={10}  {...props}>
            {children}
        </Container>
    )
}