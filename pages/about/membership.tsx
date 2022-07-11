// Import the NextJS Link component for Routing
import NextLink from "next/link"

// Import Query and Data Function
import StaffData from "@/models/staff/list"
import { useQuery } from 'react-query'

import { AspectRatio,Icon, Image, Divider, SimpleGrid, GridItem, Box, Button, Container, Heading, Stack, Text, useBreakpointValue, Wrap, WrapItem, useColorModeValue, VStack, Avatar, Badge } from '@chakra-ui/react'
import { EmailIcon, PhoneIcon, QuestionIcon, ExternalLinkIcon } from '@chakra-ui/icons'

import { Section } from "@/components/library"

const template = (props) => {


    return (<>

        <Section>
            <Box>
                <Box
                    w={{
                        base: "full",
                        md: 11 / 12,
                        xl: 9 / 12,
                    }}
                    mx="auto"
                    textAlign={{
                        base: "left",
                        md: "center",
                    }}
                >
                    <Heading
                        mb={6}
                        fontSize={{
                            base: "4xl",
                            md: "6xl",
                        }}
                        fontWeight="bold"
                        lineHeight="none"
                        letterSpacing={{
                            base: "normal",
                            md: "tight",
                        }}
                        color="gray.900"
                        _dark={{
                            color: "gray.100",
                        }}
                    >
                        2022{" "}
                        <Text
                            display={{
                                base: "block",
                                lg: "inline",
                            }}
                            w="full"
                            bgClip="text"
                            bgGradient="linear(to-r, red.500,blue.500)"
                            fontWeight="extrabold"
                        >
                            Membership
                        </Text>{" "}
                        
                    </Heading>
                    <Text
                        px={{
                            base: 0,
                            lg: 24,
                        }}
                        mb={6}
                        fontSize={{
                            base: "lg",
                            md: "xl",
                        }}
                        color="gray.600"
                        _dark={{
                            color: "gray.300",
                        }}
                    >
                        Members of TPSA gain many benefits like access to conferences, opportunities to network with other members, and the opportunity to be a part of the TPSA community.
                    </Text>
                    <Stack
                        direction={{
                            base: "column",
                            sm: "row",
                        }}
                        mb={{
                            base: 4,
                            md: 8,
                        }}
                        spacing={2}
                        justifyContent={{
                            sm: "left",
                            md: "center",
                        }}
                    >
                        <Button
                            as="a"
                            variant="solid"
                            colorScheme="brand"
                            display="inline-flex"
                            alignItems="center"
                            justifyContent="center"
                            w={{
                                base: "full",
                                sm: "auto",
                            }}
                            mb={{
                                base: 2,
                                sm: 0,
                            }}
                            size="lg"
                            cursor="pointer"
                        >
                            New Chapters
                            <Icon boxSize={4} ml={1} viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </Icon>
                        </Button>
                        <Button
                            as="a"
                            colorScheme="gray"
                            display="inline-flex"
                            alignItems="center"
                            justifyContent="center"
                            w={{
                                base: "full",
                                sm: "auto",
                            }}
                            mb={{
                                base: 2,
                                sm: 0,
                            }}
                            size="lg"
                            cursor="pointer"
                        >
                            Existing Chapters
                            
                        </Button>
                    </Stack>
                </Box>
                <Box
                    w={{
                        base: 4 / 6,
                    }}
                    mx="auto"
                    mt={20}
                    textAlign="center"
                >

                    <AspectRatio w="full"
                        rounded="lg"
                        shadow="2xl"
                        ratio={16 / 9}
                        style={{overflow:"hidden"}}>
                        <video controls>
                            <source src="https://my.tpsa.info/assets/012287fc-4554-4c26-8e06-19c9aae8a222"
                                    type="video/mp4"></source>

                            Sorry, your browser does not support embedded videos.
                        </video>
                    </AspectRatio>

                    
                </Box>
            </Box>
            

                <Heading size="md" mt={10}>
                    Pricing
                </Heading>
                <Text>
                    Membership is $15 per member per year per chapter.
                </Text>
            
        </Section>

    </>)
}

export default template

// Statically Generate Props on Build
export async function getStaticProps() {
    const staff = await StaffData()

    return {
        props: {
            staff
        },
    };
}
