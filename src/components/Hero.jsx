import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useEffect, useState } from "react"
import { heroVideo, smallHeroVideo } from "../utils"


export const Hero = () => {

  const [videoSrc, setVideoSrc] = useState( window.innerWidth > 768 ? heroVideo : smallHeroVideo );

  const handleVideoSrcSet = () => {
    setVideoSrc( window.innerWidth > 768 ? heroVideo : smallHeroVideo );
  };

  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet);
    return () => {
      window.removeEventListener("resize", handleVideoSrcSet);
    }
  }, []);
  
  useGSAP( () => {
    gsap.to("#hero", { opacity: 1, y: 0, duration: 1.5, delay: 2 });
    gsap.to("#cta", { opacity: 1, y: 0, duration: 1.5, delay: 2 });
  },[])

  return (
    <section className="bg-black w-full pb-6 relative">

      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">iPhone 15 Pro</p>

        <div className="md:w-5/6 w-3/4">
          <video 
            src={videoSrc} 
            type="video/mp4" 
            autoPlay 
            muted 
            playsInline 
            key={videoSrc} 
            className="pointer-events-none"
          />
        </div>
      </div>

      <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
        <a href="#highlights" className="btn">Buy</a>
        <p className="text-xl font-normal">From $199/month or $999</p>
      </div>

    </section>
  )
}
