import { StartupCard, StartupCardType } from "@/components/StartupCard";
import { SearchForm } from "../../components/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth()
  console.log(session?.id)

  const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params});

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

      <SanityLive/>
    </>
  );
}
