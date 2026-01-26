'use client'

import './FloatingCards.css'
import Card from './Card'
import { useEffect,useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const FloatingCards = () => {
    const container = useRef(null);
    const cardRefs = useRef([]);

    useGSAP(() => {
        const cards = cardRefs.current;
        const totalScrollHeight = window.innerHeight*3;
        const position = [14,38,62,86];
        const rotation = [-15,-7.5,7.5,15];


        ScrollTrigger.create({
            trigger:container.current.querySelector(".cards"),
            start:"top center",
            end:() => `+=${totalScrollHeight}`,
            pin:true,
            pinSpacing:true,
        })

        cards.forEach((card,index) => {
            gsap.to(card,{
                left: `${position[index]}%`,
                rotation: `${rotation[index]}`,
                ease: "none",
                scrollTrigger:{
                    trigger:container.current.querySelector(".cards"),
                    start:'top center',
                    end:() => `+=${window.innerHeight}`,
                    scrub:0.5,
                    id:`spread-${index}`,
                }
            })
        })

    },{scope:container})
  return (
    <div className="container" ref={container}>

    <div className="cards">
        {[...Array(4)].map((_,index) => (
            <Card 
            key={index} 
            id={`card-${index + 1}`}
            frontSrc="/floated/card.png"
            frontAlt="Card Image"
            backText="Your card details appear here"
            ref={(el) => (cardRefs.current[index] = el)}
            >

            </Card>
        ))}
    </div>
</div>
  )
}

export default FloatingCards