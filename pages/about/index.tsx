// Import the NextJS Link component for Routing
import NextLink from "next/link"

// Import Query and Data Function
import StaffData from "@/models/staff/list"
import { useQuery } from 'react-query'

import { Divider, SimpleGrid , GridItem, Box, Button, Container, Heading, Stack, Text, useBreakpointValue, Wrap, WrapItem, useColorModeValue, VStack, Avatar, Badge } from '@chakra-ui/react'
import { EmailIcon, PhoneIcon, QuestionIcon, ExternalLinkIcon } from '@chakra-ui/icons'

import { Section } from "@/components/library"

const template = (props) => {
    const { data } = useQuery('staff-index', StaffData, { initialData: props.staff })

    let departments = data.map(staff => staff.group.department)

    departments = departments.filter((c, index) => {
        return departments.indexOf(c) === index;
    });

    const links = [
        {
            "label": "Bylaws", 
            "url": "https://uploads-ssl.webflow.com/5b9829b5c4456315657e4fe9/6168819f57b980f593a919b8_2021%20Bylaws%20FORMATED%20(1).pdf"
        },
        {
            "label": "W9 Tax Info", 
            "url": "https://uploads-ssl.webflow.com/5b9829b5c4456315657e4fe9/6196e27c253a484feec55966_3aeec777-0e8c-4fec-96c7-fb07a19deb10.pdf"
        },
        {
            "label": "Code of Conduct", 
            "url": "https://uploads-ssl.webflow.com/5b9829b5c4456315657e4fe9/5d6001dd14f5cdfe81c9628f_Code%20of%20Conduct.pdf"
        },
        {
            "label": "Addendum A: Student Bylaws ", 
            "url": "https://uploads-ssl.webflow.com/5b9829b5c4456315657e4fe9/5d600209c701de4c8a2c072c_Addendum_%20Student%20Bylaws.pdf"
        }
    ]

    return (<>

        <Section>

            <Heading size="lg" mb={2}>About Us</Heading>

            <Text color="muted" maxW="3xl" fontSize="lg" mb={5}>
                The mission of the Texas Public Safety Association is to provide Law Public Safety Corrections and Security students with knowledge, skills, leadership, and student growth through real world career preparation, experience, training and competition opportunities.
            </Text>

            <Text color="muted" maxW="3xl" fontSize="lg" mb={2}>
            The purpose of the Texas Public Safety Association (TPSA) is to extend learning beyond the classroom for teachers/advisors and students. TPSA is a co-curricular non-profit student organization across the state of Texas. TPSA provides leadership opportunities and real world experience exposure to high school students through the means of leadership roles and competition. TPSA focuses on expanding the knowledge of current students enrolled in the Law, Public Safety, Corrections, and Security (LPSCS) Career and Technical Education (CTE) Pathway.
            </Text>
            <Box mb={10}>
                <Wrap> 
                    {links.map( link => (
                        <WrapItem key={link.url}>
                            <NextLink  href={link.url} passHref>
                                <Button mt={2} leftIcon={<ExternalLinkIcon />} variant={'link'} colorScheme={'blue'} size='md'>
                                    {link.label}
                                </Button>
                            </NextLink>
                        </WrapItem>
                    ))}
                </Wrap>
            </Box>

            <Divider></Divider>
            

            <Heading size="md" mb={2} mt={10}>Staff</Heading>

            

            <Text color="muted" maxW="3xl" fontSize="lg" mb={5} >
                TPSA is proud to be run and staffed by volunteers across the State of Texas. 
                Our volunteers are vital to the success of our organization and are responsible for the day-to-day operations of the organization.
                If you are interested in becoming a volunteer, please contact the President.
            </Text>

            <NextLink href={`mailto:johnniesheperd@tpsa.info`} passHref>
                <Button leftIcon={<QuestionIcon />} variant={'solid'} colorScheme="blue" size='md' mb={15}>
                    Get Involved
                </Button>
            </NextLink>

            {departments.map(department => (
                <>
                    <Heading size="sm" mt={10} mb={5}>{department}</Heading>

                    <SimpleGrid minChildWidth='300px' spacing={6}>
                    {data.filter(staff => staff.group.department == department).map((staff) => (

                            <Box key={staff.id} p={5} shadow='md' borderWidth='1px' borderRadius='lg' overflow='hidden' maxW={'20rem'} bg={useColorModeValue('white', 'gray.800')}>
                                <VStack>
                                    <Avatar size='xl' name={`${staff.first_name} ${staff.last_name}`} src={`https://my.tpsa.info/assets/${staff.profile_picture}`} />{' '}

                                    <Text fontSize='xl' fontWeight={700}>{`${staff.first_name} ${staff.last_name}`}</Text>

                                    <Text mt={1}>{staff.title}</Text>

                                    {staff.geographical_region && <Stack direction='row' mb={1}>
                                        {staff.geographical_region.map(r => (
                                            <Badge key={r}>{r.geographical_regions_id.name}</Badge>
                                        ))}
                                    </Stack>}

                                    {staff.email && <NextLink href={`mailto:${staff.email}`} passHref>
                                        <Button mt={2} leftIcon={<EmailIcon />} variant={'solid'}  width="100%" size='sm'>
                                            {staff.email}
                                        </Button>
                                    </NextLink>}

                                    {staff.phone && <NextLink href={`tel:+18883018772,${staff.phone}`} passHref>
                                        <Button mt={2} leftIcon={<PhoneIcon />} variant={'outline'} width="100%" size='sm'>
                                            +1 (888) 301-TPSA ext: {staff.phone}
                                        </Button>
                                    </NextLink>}
                                </VStack>
                            </Box> 

                    ))}
                    </SimpleGrid>
                </>
            ))}

            

        </Section>

        {/* <ul>
    {data.map((event) => (
      <li key={event.id}>
        <NextLink href={`/events/${event.id}`} passHref>
          <a>{event.name} {event.category} {event.scoring_base}</a>
        </NextLink>
      </li>
    ))}
  </ul> */}

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
