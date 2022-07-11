
import {Box, Text, Button, Center, useColorModeValue, Badge, Stack} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import NextLink from "next/link"

interface CardProps {
  title: string,
  subTitle?: string,
  desc?: string,
  buttonLink?: string,
  buttonText?: string,
  tags?: string[],
}

export function Card({title, subTitle, desc, buttonLink, buttonText = "Details", tags}: CardProps) {
    return (
        <Box p={5} shadow='md' borderWidth='1px' borderRadius='lg' overflow='hidden' maxW={'20rem'} bg={useColorModeValue('white', 'gray.800')}>

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