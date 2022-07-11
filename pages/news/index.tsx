// Import the NextJS Link component for Routing
import NextLink from "next/link"

// Import Query and Data Function
import { useQuery } from 'react-query'
import FeedData from "@/models/feed/list_all"

// Import UI Components
import { Section, Card } from '@/components/library';
import {Box, Stack, Badge, Heading, Text, Button, VStack, StackDivider} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';


// Page Function
const template = (props) => {

  // Set up the query to use the static generated data passed in via props and then hydrate it with new data (FeedData), this acts as a state manager and refreshes the data automatically
  const feedQuery = useQuery('feed-index', FeedData, { initialData: props.feed })

  return (
    <Section>

      <Heading
        fontWeight={900}
        fontSize={'3xl'}
        mt={8}
        lineHeight={'100%'}>
        News
      </Heading>

      <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align='stretch'
      >
        {feedQuery.data.map((post) => (
          <Box key={post.id}>
            

            <Heading
              fontWeight={900}
              fontSize={'2xl'}
              mt={8}
              lineHeight={'100%'}>
              {post.title}
            </Heading>

            <Text mt={1}>{post.date_relative}</Text>

            {post.conference && <Stack direction='row' mt={0.5}>
              <Badge  variant="subtle" size="sm">{post.conference.name}</Badge>)
            </Stack>}

            <Text fontSize='sm' color={'gray.500'} mt={1} noOfLines={3}>
              {post.description}
            </Text>

            <NextLink href={`/news/${post.id}`} passHref>
              <Button mt={2} rightIcon={<ArrowForwardIcon />} variant={'link'} colorScheme={'blue'}>
                Read More
              </Button>
            </NextLink>
          </Box>
        ))}
      </VStack>

      


    </Section>
  );

}

// Export Page Function
export default template


// Statically Generate Props on Build
export async function getStaticProps() {
  const feed = await FeedData()

  return {
    props: {
      feed
    },
  };
}
