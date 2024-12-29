import { useEffect, useRef, useState } from "react"
import { hightlightsSlides } from "../constants"
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

export const VideoCarousel = () => {

    gsap.registerPlugin(ScrollTrigger);

    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoIndex: 0,
        isLastVideo: false,
        isPlaying: false
    });

    const { isEnd, startPlay, videoIndex, isLastVideo, isPlaying } = video;

    useGSAP( () => {

        gsap.to("#slider", {
            transform: `translateX(-${videoIndex * 100}%)`,
            duration: 1.5,
            ease: "power2.inOut",
        });

        gsap.to("#video", {
            scrollTrigger: {
                trigger: "#video",
                toggleActions: "restart none none none"
            },
            onComplete: () => {
                setVideo( prev => ({ ...prev, startPlay: true, isPlaying: true }) );
            }
        })
    },[videoIndex, isEnd]);

    const [loadedData, setLoadedData] = useState([]);

    useEffect(() => {
        if ( loadedData.length > 3 ) {
            if ( !isPlaying ){
                videoRef.current[videoIndex].pause();
            } else {
                startPlay && videoRef.current[videoIndex].play();
            }
        }
    
    }, [startPlay, videoIndex, isPlaying, loadedData]);
    

    useEffect(() => {
        let currentProgress = 0;
        let videoSpan = videoSpanRef.current[videoIndex];

        if (videoSpan) {
            let animation = gsap.to( videoSpan, {
                onUpdate: () => {
                    const progress = Math.ceil(animation.progress() * 100);
                    if ( progress !== currentProgress ) {
                        currentProgress = progress;

                        gsap.to( videoDivRef.current[videoIndex], {
                            width: window.innerWidth < 768 ? '10vw'
                                : window.innerWidth < 1280 ? '10vw': '4vw',
                        });

                        gsap.to( videoSpan, {
                            width: `${currentProgress}%`,
                            backgroundColor: '#fff'
                        } )
                    }
                },
                onComplete: () => {
                    gsap.to( videoDivRef.current[videoIndex], {
                        width: '12px'
                    });

                    gsap.to( videoSpan, {
                        backgroundColor: '#afafaf'
                    });
                }
            });

            if ( videoIndex === 0 ) {
                animation.restart();
            };

            const animationUpdate = () => {
                animation.progress( videoRef.current[videoIndex].currentTime / videoRef.current[videoIndex].duration );
            };

            if ( isPlaying ) {
                gsap.ticker.add( animationUpdate );
            } else {
                gsap.ticker.remove( animationUpdate );
            }
        };

    
    }, [videoIndex, startPlay]);

    const handleLoadedMetadata = ( index, e ) => {
        setLoadedData( prev => [...prev, e] );
    };

    const handleProcess = ( videoStatus, i ) => {
        switch (videoStatus) {
            case 'video-end':
                setVideo( prev => ({ ...prev, isEnd: true, videoIndex: i + 1 }) );
                break;

            case 'video-last':
                setVideo( prev => ({ ...prev, isLastVideo: true }) );   
                break;

            case 'video-reset':
                setVideo( prev => ({ ...prev, videoIndex: 0, isLastVideo: false, isEnd: false }) );
                break;

            case 'play':
                setVideo( prev => ({ ...prev, isPlaying: !prev.isPlaying }) );
                break;

            case 'pause':
                setVideo( prev => ({ ...prev, isPlaying: !prev.isPlaying }) );
                break;
        
            default:
                return video;
        }
    };
    

  return (
    <>
    
        <div className="flex items-center">

            { hightlightsSlides.map( (item, i) => (
                <div key={item.id} id="slider" className="pr-10 sm:pr-20">

                    <div className="video-carousel_container">

                        <div className="w-full h-full flex-center overflow-hidden bg-black rounded-3xl">

                            <video 
                                ref={ el => videoRef.current[i] = el }
                                muted 
                                playsInline 
                                preload="auto"
                                onPlay={ () => {
                                    setVideo( prev => ({ ...prev, isPlaying: true }) )
                                }}
                                onEnded={ () => {
                                    i !== 3 ? handleProcess( 'video-end', i ) : handleProcess( 'video-last', i )
                                }}
                                onLoadedMetadata={ e => handleLoadedMetadata( i, e ) }>
                                    <source src={item.video} type="video/mp4" />
                            </video>

                        </div>

                        <div className="absolute top-12 left-[5%] z-10">

                            { item.textLists.map( (text, i) => (
                                <p key={i} className="text-xl md:text-2xl font-medium">{text}</p>
                            )) }

                        </div>

                    </div>

                </div>
            ))}

        </div>

        <div className="relative flex-center mt-10">
            <div className="flex-center py-5 px-7 bg-gray-300 rounded-full backdrop-blur">
                { videoRef.current.map( ( _, i ) => (
                    <div
                    key={i}
                    ref={ el => videoDivRef.current[i] = el }
                    className="w-3 h-3 rounded-full mx-2 bg-gray-200 cursor-pointer relative">
                        <span className="absolute h-full w-full rounded-full" ref={ el => videoSpanRef.current[i] = el } />
                    </div>
                )) }
            </div>

            <button className="control-btn">
                <img 
                    src={ isLastVideo ? replayImg : 
                            !isPlaying ? playImg : pauseImg 
                        } 
                    alt="button"
                    onClick={ () => {
                        isLastVideo ? handleProcess('video-reset') : 
                        !isPlaying ? handleProcess('play') : handleProcess('pause')
                    }}
                />
            </button>

        </div>

    </>
  )
}
