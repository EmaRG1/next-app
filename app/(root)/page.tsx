import { StartupCard } from "@/components/StartupCard";
import { SearchForm } from "../../components/SearchForm";

export default async function Home({ searchParams }: { searchParams: Promise<{query?: string}>   }) {
  const query = (await searchParams).query;
  const posts = [{
    _createdAt: new Date(),
    views: 55,
    author: { _id: 1, name: 'Emanuel' },
    _id:1,
    description: 'Description',
    image: 'https://img.lagaceta.com.ar/fotos/notas/2016/04/28/679915_20160428074018.jpg',
    category: 'Software Unicorn',
    title: 'Globant'
  }]
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup <br />Connect With Entrepreneurs</h1>
        <p className="!max-w-3xl sub-heading">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : "All Startups"}
        </p>

        <ul className="card_grid mt.7">
          {
            posts.length > 0 ? posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
              : (
                <p className="no-results">No results</p>
            )
          }
        </ul>
      </section>
    </>
  );
}
