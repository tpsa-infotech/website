import ConferencesData from "../models/conferences/basic_list";
import { useQuery } from 'react-query'
import { Section, Card } from '../components/library';
import Logo from '../components/Logo';
import {Wrap, WrapItem, Heading, Text} from '@chakra-ui/react';

export default function Home() {
  const {isSuccess, isError, isLoading, data} = useQuery('homeConferences', ConferencesData)

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


      <Wrap py={4}>
      {!isLoading && data.map((conference) => (
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
    </Section>
  );
}

// export async function getStaticProps() {
//   const conferences = await ConferencesData()

//   return {
//     props: {
//       conferences,
//     },
//   };
// }