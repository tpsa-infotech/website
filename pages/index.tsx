import ConferencesData from "../models/conferences/basic_list";
import FeedData from "@/models/feed/home_page"

import { useQuery } from 'react-query'
import { Section, Card } from '../components/library';
import Logo from '../components/Logo';
import {Wrap, WrapItem, Heading, Text, Button} from '@chakra-ui/react';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import NextLink from "next/link"

export default function Home(props) {
  const conferenceQuery = useQuery('homeConferences', ()=>ConferencesData(3), { initialData: props.conferences })
  const feedQuery = useQuery('homeFeed', FeedData, { initialData: props.feed })

  return (
    <Section>

      <Heading
        fontWeight={900}
        fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }}
        lineHeight={'110%'}>
        Texas Public Safety Association
      </Heading>

      <Text maxW={'3xl'} color={'gray.500'}>
        The mission of the Texas Public Safety Association is to promote Law, Public Safety, Corrections, and Security students with knowledge, skills, leadership, and student growth through real world career preparation, experience, training and competitive opportunities.
      </Text>

      <Heading
        fontWeight={900}
        fontSize={'2xl'}
        mt={8}
        lineHeight={'100%'}>
        Conferences
      </Heading>


      <Wrap py={4} opacity={conferenceQuery.isLoading ? 0.5 : 1}>
      {conferenceQuery.data.map((conference) => (
        <WrapItem key={conference.id}>
          <Card 
            title={conference.name}
            subTitle={`${conference.start_date} - ${conference.end_date}`}
            buttonLink={`/conferences/${conference.id}`}
            buttonText="Conference"
          />
        </WrapItem>
      ))}
      </Wrap>

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
        Feed
      </Heading>


      <Wrap py={4} opacity={feedQuery.isLoading ? 0.5 : 1}>
      {feedQuery.data.map((post) => (
        <WrapItem key={post.id}>
          <Card 
            title={post.title}
            subTitle={post.date_updated}
            desc={post.description}
            buttonLink={`/feed/${post.id}`}
            buttonText="Read More"
            tags={[post.conference.name]}
          />
        </WrapItem>
      ))}
      </Wrap>

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