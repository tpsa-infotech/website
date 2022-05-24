/* eslint-disable react/no-children-prop */
import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Image,
    useColorMode,

  } from '@chakra-ui/react';
  import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    ExternalLinkIcon,
    ArrowForwardIcon
  } from '@chakra-ui/icons';

  import NextLink from "next/link"

  import ThemeSwitcher from "./themeSwitcher";

  import Logo from '@/components/Logo'

  import ConferencesData from "../models/conferences/nav_bar";
  import { useQuery } from 'react-query'
  
  export default function WithSubnavigation(props) {
    const { isOpen, onToggle } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const conferenceQuery = useQuery('navbarConferences', ConferencesData, { initialData: props.conferences })

    return (
      <Box>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Logo />
  
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav conferences={conferenceQuery.data}/>
            </Flex>

          </Flex>
  
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
            <ThemeSwitcher>
            </ThemeSwitcher>
            {/* <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'blue.400'}
              href={'https://my.tpsa.info'}
              _hover={{
                bg: 'blue.300',
              }}>
              myTPSA
            </Button> */}
          </Stack>
        </Flex>
  
        <Collapse in={isOpen} animateOpacity>
          <MobileNav conferences={conferenceQuery.data}/>
        </Collapse>
      </Box>
    );
  }

  interface Navigation {
    conferences: NavItem[]
  }
  
  const DesktopNav = ({conferences}: Navigation) => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  
    return (
      <Stack direction={'row'} spacing={4}>
        <Box key={"Conferences"}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Link
                  p={2}
                  fontSize={'sm'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}>
                  Conferences
                </Link>
              </PopoverTrigger>
  
              {conferences && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}>
                  <Stack>
                    {conferences.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}

            
        

            </Popover>
          </Box>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <>
                {navItem.href && <NextLink href={navItem.href} passHref><Link
                    p={2}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={linkColor}
                    _hover={{
                      textDecoration: 'none',
                      color: linkHoverColor,
                    }}>
                    {navItem.label}
                  </Link></NextLink>}

                {!navItem.href && <Link
                  p={2}
                  href={navItem.href ?? '#'}
                  fontSize={'sm'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}>
                  {navItem.label}
                </Link>}
                </>
                
              </PopoverTrigger>
  
              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}>
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    );
  };
  
  const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
      <NextLink key={label} href={href} passHref><Link
          href={href}
          role={'group'}
          display={'block'}
          p={2}
          rounded={'md'}
          _hover={{ bg: useColorModeValue('blue.50', 'gray.900') }}>
          <Stack direction={'row'} align={'center'}>
            <Box>
              <Text
                transition={'all .3s ease'}
                _groupHover={{ color: 'blue.400' }}
                fontWeight={500}>
                {label}
              </Text>
              <Text fontSize={'sm'}>{subLabel}</Text>
            </Box>
            <Flex
              transition={'all .3s ease'}
              transform={'translateX(-10px)'}
              opacity={0}
              _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
              justify={'flex-end'}
              align={'center'}
              flex={1}>
              <Icon color={'blue.400'} w={5} h={5} as={ChevronRightIcon} />
            </Flex>
          </Stack>
        </Link></NextLink>
      
    );
  };
  
  const MobileNav = ({conferences}: Navigation) => {
    return (
      
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ md: 'none' }}>

        <MobileNavItem  label={"Conferences"} children={conferences}/>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };
  
  const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          as={Link}
          href={href ?? '#'}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
  
        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack

            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align={'start'}>
            {children &&
              children.map((child) => (
                <NextLink key={child.label} href={child.href} passHref><Link  py={2} >
                    {child.label}
                  </Link></NextLink>
                
              ))}
          </Stack>
        </Collapse>
      </Stack>
    );
  };
  
  interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
  }
  
  const NAV_ITEMS: Array<NavItem> = [
    {
      label: 'Rubrics',
      href: '/rubrics',
    },
    {
      label: 'Policies',
      href: 'https://tpsa.info/policies',
    },
    {
      label: 'Notifications',
      href: '/notifications',
    },
    {
      label: 'myTPSA',
      href: 'https://my.tpsa.info',
    },
  ];

  export async function getStaticProps() {
    const conferences = await ConferencesData()
  
    return {
      props: {
        conferences
      },
    };
  }