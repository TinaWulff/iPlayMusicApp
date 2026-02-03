'use client';
import { IoPlayCircleSharp } from "react-icons/io5";
import { MdPauseCircleFilled } from "react-icons/md";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";

import { usePlayer } from "@/app/context/PlayerContext";

// Formater sekunder til mm:ss
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function Player({ className, showFull = false }) {
    const { 
        isPlaying, 
        currentTrack, 
        currentTime, 
        duration, 
        togglePlay, 
        nextTrack, 
        prevTrack, 
        seekTo 
    } = usePlayer();

    // Klik på progress bar for at skippe
    function handleProgressClick(e) {
        const bar = e.currentTarget;
        const clickX = e.nativeEvent.offsetX;
        const width = bar.offsetWidth;
        const newTime = (clickX / width) * duration;
        seekTo(newTime);
    }

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    // Simpel visning (kun play/pause knap)
    if (!showFull) {
        return (
            <button onClick={togglePlay} className={className}> 
                {isPlaying ? <MdPauseCircleFilled size={50} /> : <IoPlayCircleSharp size={50} />}
            </button>
        );
    }

    // Fuld visning med progress, titel, controls
    return (
        <div className="w-full bg-white rounded-t-2xl p-4 shadow-2xl">
            {/* Sang info */}
            <div className="text-center mb-2">
                <p className="font-bold text-gray-800">{currentTrack?.title || 'Ingen sang valgt'}</p>
                <p className="text-sm text-gray-500">{currentTrack?.artist || ''}</p>
            </div>

            {/* Progress bar */}
            <div 
                className="w-full h-2 bg-gray-200 rounded-full cursor-pointer mb-2"
                onClick={handleProgressClick}
            >
                <div 
                    className="h-full bg-gradient-to-r from-[#EE0979] to-[#FF6A00] rounded-full transition-all"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            {/* Tid visning */}
            <div className="flex justify-between text-xs text-gray-500 mb-3">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-6">
                <button onClick={prevTrack} className="text-rose-400 hover:text-rose-600">
                    <IoPlaySkipBack size={30} />
                </button>
                <button onClick={togglePlay} className="text-rose-400 hover:text-rose-600"> 
                    {isPlaying ? <MdPauseCircleFilled size={50} /> : <IoPlayCircleSharp size={50} />}
                </button>
                <button onClick={nextTrack} className="text-rose-400 hover:text-rose-600">
                    <IoPlaySkipForward size={30} />
                </button>
            </div>
        </div>
    );
}

// Om player-flow og systemet:
// PlayBotton aktiverer playeren (kalder playTrack fra context) og denne button skal findes ved hver sang/album/playlist.

// flow
// Klik på ▶️ ved en sang
// PlayButton kalder playTrack() fra context
// Context opdaterer currentTrack og isPlaying
// Footer's Player viser nu den sang der spilles
// Åbn footer player - samme sang vises med progress bar