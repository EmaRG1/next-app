import { SearchForm } from "../components/SearchForm";

export default function Home({ searchParams }: { searchParams: { query?: string } }) {
  const query = searchParams.query;
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup <br />Connect With Entrepreneurs</h1>
        <p className="!max-w-3xl sub-heading">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>
    </>
  );
}
