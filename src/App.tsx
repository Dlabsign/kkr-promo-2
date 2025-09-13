import React, { useState, useEffect, useRef } from "react";

function App() {
  // Orientation state
  const [isLandscape, setIsLandscape] = useState(
    window.matchMedia("(orientation: landscape)").matches
  );

  // Typing text aanimation state
  const [displayText, setDisplayText] = useState("");
  const fullText =
    "BUILDING CHURCHES IN OUR YOUTH | BUILDING CHURCHES IN OUR YOUTH | ";

  // Video reference → kasih tipe HTMLVideoElement
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // State mute/unmute
  const [isMuted, setIsMuted] = useState(true);

  // Handle orientation change
  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: landscape)");
    const handleChange = (e: MediaQueryListEvent) => setIsLandscape(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Typing animation effect
  useEffect(() => {
    let i = 0;
    let isDeleting = false;

    const interval = setInterval(() => {
      if (!isDeleting) {
        if (i < fullText.length) {
          setDisplayText(fullText.substring(0, i + 1));
          i++;
        } else {
          isDeleting = true;
        }
      } else {
        if (i > 0) {
          setDisplayText(fullText.substring(0, i - 1));
          i--;
        } else {
          isDeleting = false;
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearInterval(interval);
  }, []);

  const imageUrl = isLandscape
    ? "/src/assets/horizontal.png"
    : "/src/assets/vertical.png";

  // Toggle sound
  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      videoRef.current.play().catch(() => { });
    }
  };

  return (
    <div className="w-full mt-4 relative flex flex-col items-center">
      {/* Video */}
      <div className="relative w-full">
        <video
          ref={videoRef}
          src="/src/assets/teaser-2.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-auto object-cover"
        />
        <button
          onClick={toggleSound}
          className="absolute top-3 right-3 bg-black/50 text-white px-3 py-1 rounded-lg text-sm z-10"
        >
          {isMuted ? "Turn On 🔊" : "Off 🔇"}
        </button>
        <div className="absolute w-full text-center p-4 text-white text-3xl md:text-5xl font-extrabold whitespace-nowrap overflow-hidden bg-black/60">
          {displayText}
        </div>
      </div>

      {/* Image */}
      <div className="mt-16 w-screen h-full relative overflow-hidden flex flex-col items-center">
        <img
          src={imageUrl}
          alt="Gambar berdasarkan orientasi layar"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default App;
