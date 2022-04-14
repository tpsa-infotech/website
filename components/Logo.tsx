import { useColorMode, Image } from '@chakra-ui/react';
export default function Logo() {
    const { colorMode } = useColorMode();

    if(colorMode === 'light') {
        return (<Image src='/logo.png' alt='TPSA' height={'32px'}/>)
    } else {
        return (<Image src='/logo_light.png' alt='TPSA' height={'32px'}/>)
    }
}