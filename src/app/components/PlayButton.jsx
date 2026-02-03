'use client';
import { IoPlayCircleSharp } from "react-icons/io5";
import { MdPauseCircleFilled } from "react-icons/md";
import { usePlayer } from "@/app/context/PlayerContext";

// PlayButton der kan starte en specifik sang
// Bruges på album/track cards for at starte afspilning
export default function PlayButton({ track, className }) {
    const { isPlaying, currentTrack, playTrack, togglePlay } = usePlayer();
    
    // Tjek om denne sang er den der spilles nu
    const isThisTrack = currentTrack?.id === track?.id;
    const isThisPlaying = isThisTrack && isPlaying;

    function handleClick(e) {
        e.preventDefault(); // Forhindre link klik
        e.stopPropagation();
        
        if (isThisTrack) {
            // Samme sang - toggle play/pause
            togglePlay();
        } else {
            // Ny sang - start afspilning
            playTrack(track);
        }
    }

    return (
        <button onClick={handleClick} className={className}> 
            {isThisPlaying ? <MdPauseCircleFilled size={50} /> : <IoPlayCircleSharp size={50} />}
        </button>
    );
}
