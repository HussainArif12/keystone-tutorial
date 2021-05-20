import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p>Home page</p>
      <p>
        <Link href="/company">See the list of companies</Link>
      </p>
      <p>
        <Link href="/phone"> See all phones</Link>
      </p>
    </div>
  );
}
