import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);


export const animationWithGsapScroll = ( target, animationProps, scrollProps ) => {
    gsap.to(target, {
        ...animationProps,
        scrollTrigger: {
            trigger: target,
            toggleActions: "restart reverse restart reverse",
            start: "top 85%",
            ...scrollProps
        }
    });
}


export const animationWithGsap = ( animationArgs ) => {
    const { timeline, rotationRef, rotationState, firstTarget, secondTarget, animationProps } = animationArgs;

    timeline.to(rotationRef.current.rotation, {
        y: rotationState,
        duration: 1,
        ease: "Power2.InOut"
    });

    timeline.to(firstTarget, {
        ...animationProps,
        ease: "Power2.InOut"
        },
        "<"
    );

    timeline.to(secondTarget, {
        ...animationProps,
        ease: "Power2.InOut"
        },
        "<"
    );
}