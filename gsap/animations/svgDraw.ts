import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

type SvgDrawOptions = {
    path:SVGPathElement,
    trigger:HTMLElement
    start?:string,
    end?:string,
    scrub?:boolean | number
}

export const svgDrawOnScroll = ({
  path,
  trigger,
  start = "top 80%",
  end = "bottom 20%",
  scrub = true,
}: SvgDrawOptions) => {
    const length = path.getTotalLength();

    gsap.set(path,{
        strokeDasharray:length,
        strokeDashoffset:length
    })

    return gsap.to(path,{
        strokeDashoffset:0,
        ease:"none",
        scrollTrigger:{
            trigger,
            start,
            end,
            scrub,
        }
    })
}