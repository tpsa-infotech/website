import { useRouter } from 'next/router'

import ReactMarkdown from "react-markdown";

import FeedList from "@/models/feed/list_all";
import FeedItem from "@/models/feed/item"

import { useQuery } from 'react-query'
import { Section, Card } from '@/components/library';
import Logo from '@/components/Logo';
import {Heading, Stack, Badge, Divider, Box, Text, Button, useColorModeValue} from '@chakra-ui/react';
import {EmailIcon} from '@chakra-ui/icons'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import remarkGfm from 'remark-gfm'

import { LinkIcon } from '@chakra-ui/icons';
import NextLink from "next/link"

export default function Conference(props) {

  const router = useRouter()
  const { feed_id } = router.query

  const {data} = useQuery(["feedItem", feed_id], () => FeedItem(feed_id), { initialData: props.feed })

  return (
    <Section>

      

      <Heading
        fontWeight={900}
        fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }}
        lineHeight={'110%'}
        mb={1}>
        {data.title}
      </Heading>

     

      <Stack direction={['column', 'row']} spacing='24px' mb={1}>
        <Badge>Published on {data.date_created}</Badge>
        {data.date_updated && <Badge>Updated on {data.date_updated}</Badge>}
      </Stack>

      <Text my={2}>
        {data.description}
      </Text>

      {data.conference && 
        <NextLink href={`conference/${data.conference.id}`} passHref>
          <Button my={1} leftIcon={<LinkIcon />} variant={'link'} colorScheme={'blue'}>
            Open {data.conference.name}
          </Button>
        </NextLink>
      }

      <Divider my={5} />

      <Box>
        <ReactMarkdown components={ChakraUIRenderer()} remarkPlugins={[remarkGfm]}>{data.content}</ReactMarkdown>
      </Box>
      
    </Section>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const items = await FeedList()

  type item = {
    [key: string]: any;
  };

  const paths = items.map((item: item) => {
    return {
      params: {
        feed_id: item.id
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const item = await FeedItem(params.feed_id)

  return {
    props: {
      feed: item
    },
  };
}
