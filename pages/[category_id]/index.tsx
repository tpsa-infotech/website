import { useRouter } from 'next/router'

import CategoryList from "@/models/category/list"
import CategoryItem from "@/models/category/item"
import { useQuery } from 'react-query'
import { Section } from '@/components/library';
import { Text, Heading, VStack, StackDivider, Box, Stack, Badge, Button, useColorModeValue, Center } from '@chakra-ui/react';

import NextLink from 'next/link';

import { ArrowForwardIcon, ChevronRightIcon } from '@chakra-ui/icons';

export default function Conference(props) {

  const router = useRouter()
  const { category_id } = router.query

  const { data } = useQuery(["categoryItem", category_id], () => CategoryItem(category_id), { initialData: props.category })

  return (
    <>
      <Section>

      

      <Center bgGradient="linear(to-r, red.600,blue.600)" py={10} shadow='md' borderWidth='1px' borderRadius='lg' overflow='hidden' mb={5}>
        <Heading
          fontSize={'5xl'}
          color={'white'}
          fontWeight={900}
          textShadow="md"
        >
            Membership
        </Heading>
      </Center>

      <Box p={5} shadow='md' borderWidth='1px' borderRadius='lg' overflow='hidden' bg={useColorModeValue('white', 'gray.800')}>
          <Stack>
            {data.page.map(link => (
              <NextLink key={link.slug} href={`/${data.slug}/${link.slug}`} passHref>
                <Button mt={2} leftIcon={<ChevronRightIcon/>} variant={'link'} size='md' justifyContent="flex-start">
                  {link.title}
                </Button>
              </NextLink>
            ))}
          </Stack>
        </Box>
      </Section>
    </>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const items = await CategoryList()

  type item = {
    [key: string]: any;
  };

  const paths = items.map((item: item) => {
    return {
      params: {
        category_id: item.slug
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const item = await CategoryItem(params.category_id)

  return {
    props: {
      category: item
    },
  };
}
