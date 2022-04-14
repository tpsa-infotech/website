import {Box, Text, Button, Center} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import NextLink from "next/link"

interface CardProps {
  title: string,
  subTitle?: string,
  desc?: string,
  buttonLink?: string,
  buttonText?: string
}

export default function Card({title, subTitle, desc, buttonLink, buttonText = "Details"}: CardProps) {
    return (
        <Box p={5} shadow='md' borderWidth='1px' borderRadius='lg' overflow='hidden' maxW={'20rem'}>

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