'use client';
import { createContext, useContext, useRef, useState, useEffect } from 'react';

// Lokal playlist - imiterer Spotify sange
const defaultPlaylist = [
    { id: 1, title: "Love in Japan", artist: "Milky Wayvers", src: "/assets/music/Milky_Wayvers_Love-in-Japan.mp3" },
    { id: 2, title: "Kyoto", artist: "Another Kid & Pratzapp", src: "/assets/music/Another Kid & Pratzapp - Kyoto (freetouse.com).mp3" },
    { id: 3, title: "Coming Of Age", artist: "Hazelwood", src: "/assets/music/Hazelwood - Coming Of Age (freetouse.com).mp3" },
    { id: 4, title: "Honey Jam", artist: "massobeats", src: "/assets/music/massobeats - honey jam (freetouse.com).mp3" },
];

const PlayerContext = createContext();

export function usePlayer() {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error('usePlayer must be used within PlayerProvider');
    }
    return context;
}

export function PlayerProvider({ children }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(defaultPlaylist[0]);
    const [playlist, setPlaylist] = useState(defaultPlaylist);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Setup audio element og event listeners
    useEffect(() => {
        // Opret audio element hvis det ikke findes
        if (!audioRef.current) {
            audioRef.current = new Audio(currentTrack.src);
        }

        const audio = audioRef.current;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleEnded = () => nextTrack();

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    // Når currentTrack ændres, opdater audio src
    useEffect(() => {
        if (audioRef.current && currentTrack) {
            audioRef.current.src = currentTrack.src;
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    }, [currentTrack]);

    function play() {
        audioRef.current?.play();
        setIsPlaying(true);
    }

    function pause() {
        audioRef.current?.pause();
        setIsPlaying(false);
    }

    function togglePlay() {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }

    // Afspil en specifik sang (kaldes fra andre komponenter)
    function playTrack(track) {
        setCurrentTrack(track);
        setIsPlaying(true);
        // Giv tid til at src opdateres før play
        setTimeout(() => audioRef.current?.play(), 100);
    }

    function nextTrack() {
        const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
        const nextIndex = (currentIndex + 1) % playlist.length;
        playTrack(playlist[nextIndex]);
    }

    function prevTrack() {
        const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        playTrack(playlist[prevIndex]);
    }

    function seekTo(time) {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    }

    const value = {
        // State
        isPlaying,
        currentTrack,
        currentTime,
        duration,
        playlist,
        
        // Actions
        play,
        pause,
        togglePlay,
        playTrack,
        nextTrack,
        prevTrack,
        seekTo,
    };

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    );
}
