import ConferencesData from "../models/conferences/basic_list";
import FeedData from "@/models/feed/home_page"

import { useQuery } from 'react-query'
import { Section, Card } from '../components/library';
import Logo from '../components/Logo';
import {Stack, Badge, useColorModeValue, Wrap, WrapItem, Heading, Text, Button, Box, HStack, Alert, AlertIcon, AlertTitle, AlertDescription, SimpleGrid } from '@chakra-ui/react';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import NextLink from "next/link"

function ConferenceCard({title, subTitle, desc, buttonLink, buttonText = "Details", tags}) {
  return (
      <Box p={5} shadow='md' borderWidth='1px' borderRadius='lg' overflow='hidden' w={'100%'} bg={useColorModeValue('white', 'gray.800')}>

        {tags && <Stack direction='row' mb={1}>
          {tags.map(text => <Badge key={text} variant="subtle" size="sm">{text}</Badge>)}
        </Stack>}

        <Text fontSize='lg' fontWeight={700}>{title}</Text>

        {subTitle && <Text mt={1}>{subTitle}</Text>}


        {desc && <Text fontSize='sm' color={'gray.500'} mt={1} noOfLines={3}>
          {desc}
        </Text>}
        
        {buttonLink &&
          <NextLink href={buttonLink} passHref>
            <Button mt={2} rightIcon={<ArrowForwardIcon />} variant={'link'} colorScheme={'blue'}>
              {buttonText}
            </Button>
          </NextLink>
        }
      </Box> 
  )
}

export default function Home(props) {
  const conferenceQuery = useQuery('homeConferences', ()=>ConferencesData(3), { initialData: props.conferences })
  const feedQuery = useQuery('homeFeed', FeedData, { initialData: props.feed })


  return (
    <Section>

      <Box shadow='md' borderRadius='lg' overflow='hidden' mb={5}>
      <Alert status='warning'>
        <AlertIcon />
        <AlertTitle>Beta Site</AlertTitle>
        <AlertDescription>
          This site is a beta version and may not be stable.
        </AlertDescription>
        
      </Alert>
      </Box>

      <Box bgGradient="linear(to-r, red.600,blue.600)" p={10} shadow='md' borderWidth='1px' borderRadius='lg' overflow='hidden' mb={5}>
        <Heading
          fontSize={'5xl'}
          color={'white'}
          fontWeight={900}
          textShadow="md"
        >
          Texas Public Safety Association
        </Heading>

        <Text maxW={'3xl'} color={'white'} mb={10}>
          The mission of the Texas Public Safety Association is to promote Law, Public Safety, Corrections, and Security students with knowledge, skills, leadership, and student growth through real world career preparation, experience, training and competitive opportunities.
        </Text>

        <HStack>
          <NextLink href="/join" passHref>
            <Button colorScheme="blackAlpha" variant="solid">
                Join Today
            </Button>
          </NextLink>

          <NextLink href="/compete" passHref>
            <Button colorScheme="blackAlpha" variant="solid">
                Competition
            </Button>
          </NextLink>
          
        </HStack>
      </Box>

      <Heading
        fontWeight={900}
        fontSize={'2xl'}
        mt={8}
        lineHeight={'100%'}>
        Conferences
      </Heading>



      <SimpleGrid columns={{base: 1, md: 3}} spacing={5} py={4} opacity={conferenceQuery.isLoading ? 0.5 : 1}>
      {conferenceQuery.data.map((conference) => (
          <ConferenceCard 
            key={conference.id}
            title={conference.name}
            subTitle={`${conference.start_date} - ${conference.end_date}`}
            buttonLink={`/conferences/${conference.id}`}
            buttonText="Conference"
            tags={[]}
            desc={null}
          />
      ))}
      </SimpleGrid >


      <NextLink href={"/feed"} passHref>
        <Button mt={2} rightIcon={<ArrowForwardIcon />} variant={'link'} colorScheme={'blue'}>
          All Conferences
        </Button>
      </NextLink>


      <Heading
        fontWeight={900}
        fontSize={'2xl'}
        mt={8}
        lineHeight={'100%'}>
        News
      </Heading>

      <SimpleGrid columns={{base: 1, md: 3}} spacing={5} py={4} opacity={conferenceQuery.isLoading ? 0.5 : 1}>
      {feedQuery.data.map((post) => (
          <ConferenceCard 
            key={post.id}
            title={post.title}
            subTitle={post.date_updated}
            desc={post.description}
            buttonLink={`/feed/${post.id}`}
            buttonText="Read More"
            tags={post.conference ? [post.conference.name] : []}
          />
      ))}
      </SimpleGrid >

      <NextLink href={"/feed"} passHref>
        <Button mt={2} rightIcon={<ArrowForwardIcon />} variant={'link'} colorScheme={'blue'}>
          All Posts
        </Button>
      </NextLink>

    </Section>
  );
}

export async function getStaticProps() {
  const conferences = await ConferencesData(3)
  const feed = await FeedData()

  return {
    props: {
      conferences,
      feed
    },
  };
}

