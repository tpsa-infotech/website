import { useColorMode, Image, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Logo() {
    const { colorMode } = useColorMode();

    if(colorMode === 'light') {
        return (<NextLink href={"/"} passHref><Link><Image src='/logo.png' alt='TPSA' height={'32px'}/></Link></NextLink>)
    } else {
        return (<NextLink href={"/"} passHref><Link><Image src='/logo_light.png' alt='TPSA' height={'32px'}/></Link></NextLink>)
    }
}