import { motion } from "framer-motion";

import { styles } from "../styles";
import { BunnyCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#d4a373]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Welcome to <span className='text-[#d4a373]'>South Ground</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            A space where ideas thrive and collaboration begins.
          </p>
        </div>
      </div>

      <BunnyCanvas />
      
      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
      <a href="#solution">
        <div className="text-white text-xl animate-bounce mt-6">
          ↓ See what we offer
        </div>
      </a>
      </div>
    </section>
  );
};

export default Hero;
