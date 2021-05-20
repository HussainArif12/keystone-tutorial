import { gql } from "@apollo/client";
import client from "../../helpers/apollo-client";
import Link from "next/link";

export default function AllPhones({ data }) {
  console.log(data);
  return (
    <div>
      <h1>List of all phones</h1>
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
export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        allPhones {
          id
          name
        }
      }
    `,
  });

  return {
    props: {
      data: data.allPhones,
    },
  };
}
