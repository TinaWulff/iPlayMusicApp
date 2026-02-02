import { cookies } from "next/headers";
import fetchLatestPlayedTracks from "./utilities/fetch-latestPlayedTracks";
import { redirect } from "next/navigation";
import Link from "next/link";
import { IoPlayCircleSharp } from "react-icons/io5";
import Image from "next/image";

export default async function Home() {
  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get("IPM_AT");

  const latestPlayedTracks = await fetchLatestPlayedTracks();
    if (!latestPlayedTracks) {
      redirect('/login');
    }

  const response = await fetch('https://api.spotify.com/v1/me/', {
    headers: {
      'Authorization': `Bearer ${accessTokenCookie.value}`
    }
  });

  const data = await response.json();
  console.log(data);

  return (
    <>
    <section className="w-full">

    <h2 className="flex justify-center items-center mb-4">
      Welcome to <span className="text-rose-400 text-xl font-bold mx-2"> I Play Music </span> {data.display_name}
    </h2>
    <h1 className="bg-gradient-to-br from-[#EE0979] to-[#FF6A00] bg-clip-text text-transparent text-3xl mb-4 font-bold mx-2"> Last Played Tracks </h1>
    
    <ul className="flex flex-col overflow-y-auto ] h-[800px] pb-15 flex-1 w-full max-w-full">
    {latestPlayedTracks.map((item) => (

      <li key={item.track.id}     className="w-full grid gap-x-4 [grid-template-columns:auto_3fr_3fr] group hover:bg-gradient-to-br from-[#EE0979] to-[#FF6A00] hover:shadow-lg rounded-lg mb-4">
     
         <div className="relative w-full min-w-[70px] min-h-[70px] flex-shrink-0 col-1 row-span-2 group">
          <Image
              src={item.track.album.images[0].url}
              alt={item.track.name}
              width={80}
              height={80}
              className="hidden group-hover:block rounded"
            />
          <Link href={`/tracks/${item.track.id}`}>
            <IoPlayCircleSharp
              size={50}
              className="col-start-1 absolute inset-0 m-auto text-rose-500 group-hover:w-[35px]"
              style={{ left: 0, right: 0, top: 0, bottom: 0 }}
            />
          </Link>
       </div>
          <p className="text-md font-bold col-2 self-center row-span-2 group-hover:text-white">{item.track.name}
          <br /><span className="col-start-2 font-light text-xs">{item.track.artists[0].name}</span></p>
          <p className="flex col-3 row-2 text-xs justify-self-end self-center mr-4 group-hover:text-white mb-2" >
          <IoPlayCircleSharp size={12} className="inline self-center mr-2"/>
          {item.played_at.slice(0, 10) + " " + item.played_at.slice(11, 16)}
        </p>

      </li>
      ))}
      </ul>

    </section>
    </>
  );
}

// Text-gradient Tailwind:
// bg-gradient-to-br fra og til farver
// bg-clip-text for at klippe baggrunden til teksten
// text-transparent for at gøre teksten gennemsigtig, så gradienten vises
// bg-gradient-to-br from-[#EE0979] to-[#FF6A00] bg-clip-text text-transparent

// SLICE EXPLANATION:
// Du kan bruge .slice() på en streng for at fjerne de sidste tegn eller vise et bestemt udsnit.
// Hvis du vil fjerne de sidste fx 5 tegn:
// Hvis du vil vise fra tegn 0 til 8 (de første 8 tegn):
// Hvis du vil vise fra tegn 8 og frem:
// Så ja, .slice(8) viser alt fra tegn 8 og frem. Tilpas tallene efter, hvad du vil vise/skjule!