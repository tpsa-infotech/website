import Form from "@rjsf/chakra-ui";

import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { Section, Card } from '@/components/library';

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

  const {json_schema} = props.form

  return (
    <Section>

      <Form schema={json_schema} liveValidate={true} onSubmit={async (data) => { await submitForm(form_id,data.formData) }}
         />

      
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