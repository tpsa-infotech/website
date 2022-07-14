import Form from "@rjsf/chakra-ui";

import { useRouter } from 'next/router'
import { useMutation } from 'react-query'

import { Section, Card } from '@/components/library';
import {Box, useColorModeValue, Stack, Heading, Text, Alert, AlertTitle, AlertDescription, AlertIcon } from '@chakra-ui/react'

import FormList from "@/models/forms/list";
import FormItem from "@/models/forms/item"
import FormSubmit from "@/models/forms/submit"

async function submitForm(form_id,data){
  const form = await FormSubmit(form_id,data)
  return form
}


export default function FormPage(props) {

  const router = useRouter()
  const { form_id } = router.query

  const {json_schema, ui_schema} = props.form

  const mutation = useMutation(async formData => {
    return await submitForm(form_id, formData)
  })

  const onSubmit = data => {
    mutation.mutate(data)
  }


  return (
    <Section>
      <Box p={10} shadow='md' borderWidth='1px' borderRadius='lg' overflow='hidden' bg={useColorModeValue('white', 'gray.800')}>
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
              Form Title
            </Heading>

            <Text color="muted" maxW="3xl" fontSize="lg" mb={5}>
                Let us know how we can help you and your contact info to reach you.
            </Text>

            {mutation.isSuccess ? 
              <Alert
                status='success'
                variant='subtle'
                borderWidth='1px' 
                borderRadius='lg'
                mb={5}
              >
                <AlertIcon />
                <AlertTitle >
                  Form Submitted
                </AlertTitle>
              </Alert> : null}

              <Form disabled={mutation.isLoading || mutation.isSuccess} schema={json_schema} uiSchema={ui_schema} liveValidate={true} onSubmit={onSubmit}/>


      </Box>
    </Section>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const forms = await FormList(-1)

  const paths = forms.map((item) => {
    return {
      params: {
        form_id: item.slug
      }
    } 
  })

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const form = await FormItem(params.form_id)
  console.log(form)
  return {
    props: {
      form
    },
  };
}