import { gql } from "@apollo/client";
import client from "../../helpers/apollo-client";
import Link from "next/link";
import { DocumentRenderer } from "@keystone-next/document-renderer";

export default function PhoneData({ data }) {
  return (
    <div>
      <h1>Phone name: {data.name}</h1>
      <h2>Description:</h2>
      <DocumentRenderer document={data.document.document} />
    </div>
  );
}

//get list of all Phones:
export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query {
        allPhones {
          id
        }
      }
    `,
  });

  const paths = data.allPhones.map((item) => ({
    params: {
      id: item.id,
    },
  }));

  return { paths, fallback: false };
}

//fetch just one phone... you're doing it right
export async function getStaticProps({ params }) {
  const { id } = params;
  const { data } = await client.query({
    query: gql`
      query Phone($id: ID!) {
        Phone(where: { id: $id }) {
          name
          id
          document {
            document
          }
        }
      }
    `,
    variables: { id },
  });
  return {
    props: {
      data: data.Phone,
    },
  };
}
