import React, { useState, useEffect } from 'react'
import ViewSection from './ViewSection'
import SmallScreen from './SmallScreen'


function Home() {
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 700;

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
    
        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
      }, []);

    return width < breakpoint ? 
            <SmallScreen/> :
            <ViewSection />
}

export default Home
