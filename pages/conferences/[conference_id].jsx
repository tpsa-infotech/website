import { useRouter } from 'next/router'


import ConferenceList from "@/models/conferences/basic_list";
import ConferenceItem from "@/models/conferences/item"

import { useQuery } from 'react-query'
import { Section, Card } from '@/components/library';
import Logo from '@/components/Logo';
import {Wrap, WrapItem, Heading, Text, Button} from '@chakra-ui/react';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import NextLink from "next/link"

export default function Conference(props) {

  const router = useRouter()
  const { conference_id } = router.query

  const {data} = useQuery(["conferenceItem", conference_id], () => ConferenceItem(conference_id), { initialData: props.conference })

  return (
    <Section>

      <Heading
        fontWeight={900}
        fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }}
        lineHeight={'110%'}>
        {data.name}
      </Heading>

      
    </Section>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const conferences = await ConferenceList(-1)

  const paths = conferences.map((item) => {
    return {
      params: {
        conference_id: item.id
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const conference = await ConferenceItem(params.conference_id)

  return {
    props: {
      conference
    },
  };
}
