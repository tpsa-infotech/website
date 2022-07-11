import { useRouter } from 'next/router'

import ReactMarkdown from "react-markdown"

import PageList from "@/models/page/list"
import PageItem from "@/models/page/item"
import { useQuery } from 'react-query'

import { Section, Card } from '@/components/library';
import { Heading, Stack, Badge, Divider, Box, Grid, GridItem, Container, Button, useColorModeValue, Text, Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import remarkGfm from 'remark-gfm'

import NextLink from "next/link"

import { ChevronRightIcon, ExternalLinkIcon } from '@chakra-ui/icons'

export default function Conference(props) {

  const router = useRouter()
  const { page_id } = router.query

  const { data } = useQuery(["pageItem", page_id], () => PageItem(page_id), { initialData: props.page })

  return (
    <Container maxWidth={'8xl'} py={10}  {...props}>

      <Flex>
        <Box w='20rem' p={5}>

        </Box>
        <Box flex='1' p={5}>


        </Box>
      </Flex>

      <Flex align="flex-start" display={{
        base: 'block', // 0-48em
        lg: 'flex',
      }}>
        <Box p={5} pr={10} mr={10} shadow='md' borderWidth='1px' borderRadius='lg' overflow='hidden' bg={useColorModeValue('white', 'gray.800')} display={{
          base: 'none', // 0-48em
          lg: 'block',
        }}>
          <Text fontSize="lg" fontWeight={700}>
            {data.category.name}
          </Text>
          <Stack>
            {data.category.page.map(link => (
              <NextLink key={link.slug} href={`/${data.category.slug}/${link.slug}`} passHref>
                <Button mt={2} leftIcon={<ChevronRightIcon />} variant={'link'} colorScheme={link.slug == page_id && 'blue' || 'gray'} size='md' justifyContent="flex-start">
                  {link.title}
                </Button>
              </NextLink>
            ))}
          </Stack>
        </Box>

        <Box flex='1'>
          <Breadcrumb mb={2}>
            <BreadcrumbItem>
              <NextLink href="/" passHref>
                <BreadcrumbLink >Home</BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <NextLink href={"/" + data.category.slug} passHref>
                <BreadcrumbLink >{data.category.name}</BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <NextLink href={"/" + data.category.slug + "/" + data.slug} passHref>
                <BreadcrumbLink >{data.title}</BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Heading
            mb={5}
            fontWeight={900}
            size={'xl'}
            lineHeight={'110%'}
            bgClip="text"
            bgGradient="linear(to-r, red.600,blue.600)"
            display={{
              base: "inline-block"
            }}>
            {data.title}
          </Heading>

          <ReactMarkdown components={ChakraUIRenderer()} remarkPlugins={[remarkGfm]}>{data.content}</ReactMarkdown>
          {data.date_updated && <Badge>Updated on {data.date_updated}</Badge> || <Badge>Published on {data.date_created}</Badge>}
        </Box>

        {data.resources &&
          <Box p={5} >
            <Text fontSize="lg" fontWeight={700}>
              Resources
            </Text>
            <Stack>
              {data.resources.map(link => (
                <NextLink key={link.link} href={link.link} passHref>
                  <Button mt={2} leftIcon={<ExternalLinkIcon />} variant={'link'} size='sm' justifyContent="flex-start">
                    {link.label}
                  </Button>
                </NextLink>
              ))}
            </Stack>
          </Box> || <Box w='20rem' p={5} />}
      </Flex>

    </Container>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const items = await PageList()

  type item = {
    [key: string]: any;
  };

  const paths = items.map((item: item) => {
    return {
      params: {
        page_id: item.slug,
        category_id: item.category.slug
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const item = await PageItem(params.page_id)

  return {
    props: {
      page: item
    },
  };
}
