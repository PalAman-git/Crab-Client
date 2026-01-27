import { FloatingCards,ScrollPathPage,PhysicsBackground } from "@/components";
import { ReactLenis } from 'lenis/react';

export default function Home() {
  return (
    <>
    <ReactLenis root>
      <section className="intro">
        <h1>Crab Client 🦀</h1>
      </section>
      {/* <ScrollPathPage /> */}
      <section className="outro">
        <h1>Center div</h1>
      </section>

      <section style={{position:"relative", minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center",background: "#0b0f14"
}}>
        <PhysicsBackground />
        <div style={{ position: "relative", zIndex: 2 ,color:"white"}}>
          <h1>This is the End content</h1>
        </div>
      </section>

      
    </ReactLenis>
    </>
  );
}
