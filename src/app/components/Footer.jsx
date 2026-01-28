'use client'
import { IoChevronBack } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";

import { BsSearchHeart } from "react-icons/bs";
import { MdLibraryMusic } from "react-icons/md";
import { RiStarSmileLine } from "react-icons/ri";
import { RiUserSettingsLine } from "react-icons/ri";



// Funktion til at tjekke om path matcher og returnere active-klassse
function isActive(path, currentPath) {
    return path === currentPath ? "font-bold text-rose-600" : "";
}


import Link from "next/link";

export default function Footer() {
    const pathname = usePathname();
    const [showDiscover, setShowDiscover] = useState(false);

    // Overlay klik
    const handleDiscoverClick = () => setShowDiscover((v) => !v);
    const handleOverlayClick = () => setShowDiscover(false);

    return (
        <footer className="w-full max-w-full px-4 fixed bottom-0 h-[66px] bg-white shadow-2xl flex items-center justify-center z-50"
            style={{ boxShadow: "0 -4px 24px 0 rgba(0,0,0,0.25)" }}>
            <ul className="flex text-xs justify-between justify-items-center align-center text-rose-400 w-full max-w-full">
                <li className="content-center">
                    <Link href="/playlists" className={`flex flex-col items-center ${isActive("/playlists", pathname)}`}>
                        <MdLibraryMusic size={26} /> Playlists
                    </Link>
                </li>
                <li className="content-center">
                    <Link href="/my-top-artists" className={`flex flex-col items-center ${isActive("/my-top-artists", pathname)}`}>
                        <RiStarSmileLine size={26} /> My Artists
                    </Link>
                </li>
                <li className="content-center">
                    <Link href="/player" className="flex flex-col items-center">
                        <Image className="rounded-full p-2 w-[55] h-[55] bg-gradient-to-br from-[#EE0979] to-[#FF6A00]"
                            src="/assets/_ionicons_svg_md-wifi.svg"
                            alt="Wifi"
                            width={33}
                            height={33}
                        />
                    </Link>
                </li>


                <li className="content-center">
                    <button type="button" onClick={handleDiscoverClick} className={`flex flex-col items-center ${showDiscover ? "font-bold text-red-400" : ""}`}>
                        <BsSearchHeart size={26} /> Discover
                    </button>
                    {showDiscover && (
                        <>
                            <div onClick={handleOverlayClick} style={{position:'fixed', inset:0, zIndex:40}} />
                            <ul style={{position:'fixed', bottom:60, left:0, right:0, zIndex:50}}>
                                <li><Link href="/categories">Categories</Link></li>
                                <li><Link href="/artists">Artists</Link></li>
                                <li><Link href="/popular">Popular</Link></li>
                                <li><Link href="/new-releases">New Releases</Link></li>
                            </ul>
                        </>
                    )}
                </li>
                <li className="content-center">
                    <Link href="/profile" className={`flex flex-col items-center ${isActive("/profile", pathname)}`}>
                        <RiUserSettingsLine size={26} /> Profile
                    </Link>
                </li>
            </ul>
        </footer>
    );
}
