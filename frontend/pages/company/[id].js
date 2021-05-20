import { gql } from "@apollo/client";
import client from "../../helpers/apollo-client";
import Link from "next/link";

export default function PhoneList({ data }) {
  console.log(data);
  return (
    <div>
      <h1> List of phones</h1>
      {data.map((item) => (
        <p key={item.id}>
          <Link href={`/phone/${item.id}`}>
            <a>{item.name}</a>
          </Link>
        </p>
      ))}
    </div>
  );
}
//get list of all companies:
export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query {
        allCompanies {
          id
        }
      }
    `,
  });

  const paths = data.allCompanies.map((item) => ({
    params: {
      id: item.id,
    },
  }));

  return { paths, fallback: false };
}

//fetch just one company... you're doing it right
export async function getStaticProps({ params }) {
  const { id } = params;
  const { data } = await client.query({
    query: gql`
      query Company($id: ID!) {
        Company(where: { id: $id }) {
          phone {
            name
            id
          }
        }
      }
    `,
    variables: { id },
  });
  return {
    props: {
      data: data.Company.phone,
    },
  };
}
