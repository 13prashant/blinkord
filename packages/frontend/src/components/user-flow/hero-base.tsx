

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import Image from "next/image";

export function HeroBase({ onConnect }: { onConnect: () => void }) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-excon px-4 py-8 md:px-6 md:my-10">
      {/* Gradient bubbles */}
      <motion.div
        className="absolute top-10 left-10 w-24 h-24 md:w-40 md:h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-36 h-36 md:w-60 md:h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center justify-center space-y-4 md:space-y-6">
        <motion.h1
          className="text-2xl sm:text-3xl lg:text-5xl font-normal tracking-tight text-center leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Unlock premium
          <motion.span
            className="relative inline-block group mx-1"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              className="my-auto -mt-1 md:-mt-2 inline w-16 sm:w-20 md:w-24 lg:w-32 z-20 relative"
              width={192}
              height={108}
              src="/evolve.svg"
              alt=""
            />
            <motion.div
              className="absolute -top-1 -left-1 md:-top-2 md:-left-2 w-4 h-4 md:w-6 md:h-6 border-t-2 border-l-2 border-neon-blue z-10"
              animate={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 2, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 border-b-2 border-r-2 border-neon-pink z-10"
              animate={{ rotate: 0 }}
              whileHover={{ rotate: -360 }}
              transition={{ duration: 2, ease: "linear" }}
            />
            <motion.div
              className="absolute -inset-2 md:-inset-3 bg-neon-purple opacity-20 z-0"
              animate={{ rotate: [0, 360] }}
            />
          </motion.span>{" "}
          Discord
          <motion.span
            className="relative inline-block group md:mx-2 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              className="inline w-12 sm:w-16 md:w-20 z-20 relative mr-6 lg:mr-10"
              width={192}
              height={108}
              src="/transhumans-roboto.webp"
              alt=""
            />
            <div className="inline-block flex-1 relative whitespace-nowrap">experiences with <span className="highlight-blue">Blinkord</span>.</div>
            <motion.div
              className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 border-t-2 border-r-2 border-neon-blue z-10"
              animate={{ rotate: 0 }}
              whileHover={{ rotate: -360 }}
              transition={{ duration: 2, ease: "linear" }}
            />

            <div className="absolute inset-0 -z-10 flex justify-center items-center">
              {/* //yellow */}
              <motion.div
                className="absolute top-0 sm:-top-4  -left-4 w-0 h-0 border-l-[15px] sm:border-l-[20px] md:border-l-[25px] lg:border-l-[35px] xl:border-l-[45px] border-l-transparent border-r-[15px] sm:border-r-[20px] md:border-r-[25px] lg:border-r-[35px] xl:border-r-[45px] border-r-transparent border-b-[30px] sm:border-b-[40px] md:border-b-[50px] lg:border-b-[70px] xl:border-b-[90px] border-b-yellow-400 z-1"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />

              {/* //purple */}
              <motion.div
                className="absolute top-1/4 xl:top-10 left-0 w-14 sm:w-12 md:w-16 lg:w-20 xl:w-24 h-10  lg:h-20 bg-indigo-600 z-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
            </div>
            <motion.div
              className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 border-t-2 border-r-2 border-neon-blue z-10"
              animate={{ rotate: 0 }}
              whileHover={{ rotate: -360 }}
              transition={{ duration: 2, ease: "linear" }}
            />
          </motion.span>
        </motion.h1>

        <motion.div
          className="text-sm sm:text-base md:text-lg lg:text-xl text-center"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="mb-1 md:mb-2">
            Monetize your <span className="highlight-green">Discord</span>{" "}
            server <span className="highlight-cyan">effortlessly</span>.
          </p>
          <p className="opacity-50 dark:text-white text-black text-xs sm:text-sm md:text-base">
            Create shareable links that grant access to exclusive discord roles
            with just a few clicks.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center w-full mb-4 md:mb-6 space-y-4 sm:space-y-0 sm:space-x-4"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex justify-center w-full">
            <Button
              onClick={onConnect}
              className="w-fit h-10 sm:h-12 bg-builderz-blue hover:bg-neon-cyan text-black font-bold py-2 px-4 sm:px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              <LogIn className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Get Started
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}