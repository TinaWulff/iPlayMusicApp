'use client'
import { IoChevronBack } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation'
import { useState } from "react";
import { useRouter } from 'next/navigation';


function formatPathname(pathname) {
  if (!pathname || pathname === "/") return "Latest played tracks";
  // Fjern første /
  let clean = pathname.slice(1);
  // Split på / og -
  let words = clean.split(/[-/]/);
  // Sæt stort for hvert ord
let capitalized = words.map(
 word => word.charAt(0) + word.slice(1));
  //  let capitalized = words.map(
  //  word => word.charAt(0).toUpperCase() + word.slice(1)
  return capitalized.join(" ");
}


export default function Header() {
    const pathname = usePathname();
    const router = useRouter();

    const [showSearch, setShowSearch] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (e) => {
    e.preventDefault();
    // ... din søgelogik her
  };


  return (
    <header className="grid grid-cols-[1fr_3fr_1fr] width-full m-4 items-center">
        <button className=" hover:cursor-pointer" onClick={() => router.back()}><IoChevronBack /></button>
        <p className="justify-self-center uppercase text-xs"
        >{formatPathname(pathname)}</p>


     <button className="justify-self-end"
        aria-label="Åbn søgning"
        onClick={() => setShowSearch((state) => !state)}
      >
        <IoSearchOutline />
      </button>
      {showSearch && (
        <form onSubmit={handleSearch}
            className="grid grid-cols-[3fr_1fr] gap-2 col-span-3">
          <input className="width-full"

            id="search-input"
            type="text"
            name="query"
            placeholder="Søg efter musik, artist eller album"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            required
          />
          <button className="grid-start-3 justify-self-end"
           type="submit">Søg</button>
        </form>
      )}
    </header>
  )
}
