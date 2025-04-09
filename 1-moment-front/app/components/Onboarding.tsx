"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Button from "./Button";
import { motion, AnimatePresence } from "framer-motion";
import HandDrawnButton from "./HandDrawnButton";
// import Lottie from "lottie-react";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type OnboardingStep = {
  // description: string;
  subtext?: React.ReactNode;
  illustration: string;
  lottieAnimation?: string;
};

interface OnboardingProps {
  onComplete: () => void;
}

const onboardingSteps: OnboardingStep[] = [
  {
    subtext: (
      <>
        1. Create your unique
        <br /> digital signature
      </>
    ),
    illustration: "/1-screen.svg",
    lottieAnimation: "/lottie/1.json",
  },
  {
    subtext: (
      <>
        2. Connect with
        <br /> someone special
      </>
    ),
    illustration: "/2-screen.svg",
    lottieAnimation: "/lottie/2.json",
  },
  {
    subtext: (
      <>
        3. Create custom moment
        <br /> and send it with value
      </>
    ),
    illustration: "/3-screen.svg",
    lottieAnimation: "/lottie/3.json",
  },
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [initialAnimationComplete, setInitialAnimationComplete] =
    useState(false);
  const [lottieData, setLottieData] = useState(null);

  // Set initialAnimationComplete to true after first render
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialAnimationComplete(true);
    }, 1000); // Wait for initial animations to complete

    return () => clearTimeout(timer);
  }, []);

  // Load Lottie animation data when needed
  useEffect(() => {
    const stepData = onboardingSteps[currentStep];
    if (stepData.lottieAnimation) {
      fetch(stepData.lottieAnimation)
        .then((response) => response.json())
        .then((data) => setLottieData(data))
        .catch((error) =>
          console.error("Error loading Lottie animation:", error),
        );
    } else {
      setLottieData(null);
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-between bg-[#F4EEDE] z-50 p-6 overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header - only animate on initial appearance */}
      <motion.header
        className="w-full max-w-md pt-2"
        initial={!initialAnimationComplete ? { y: -20, opacity: 0 } : false}
        animate={
          !initialAnimationComplete ? { y: 0, opacity: 1 } : { opacity: 1 }
        }
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            className="rounded-md p-2 "
            initial={!initialAnimationComplete ? { y: -50, opacity: 0 } : false}
            animate={
              !initialAnimationComplete ? { y: 0, opacity: 1 } : { opacity: 1 }
            }
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <Image src="/Logo.svg" alt="1moment" width={235} height={60} />
          </motion.div>
          {/* <motion.div
            className="text-[#979380] text-xl font-schoolbell"
            initial={!initialAnimationComplete ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
          >
            {currentStepData.description}
          </motion.div> */}
        </div>
      </motion.header>

      {/* Content that changes between steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          className="flex flex-col items-center justify-center w-full h-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Body */}
          <motion.main className="flex-1 flex flex-col items-center justify-center w-full max-w-md py-8">
            <motion.div
              className="w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
            >
              {currentStepData.lottieAnimation ? (
                <div className="relative w-[300px] h-[200px] mx-auto">
                  {lottieData ? (
                    <Lottie
                      animationData={lottieData}
                      className="w-full h-full"
                      loop={true}
                      autoplay={true}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image
                        src={currentStepData.illustration}
                        alt={`Onboarding step ${currentStep + 1}`}
                        width={300}
                        height={200}
                        className="mx-auto"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <Image
                  src={currentStepData.illustration}
                  alt={`Onboarding step ${currentStep + 1}`}
                  width={300}
                  height={200}
                  className="mx-auto"
                />
              )}
            </motion.div>

            <motion.div
              className="text-[#071FC0] text-2xl mt-6 mb-2 font-schoolbell w-[320px] text-center whitespace-pre-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {currentStepData.subtext}
            </motion.div>

            {currentStep === 0 && (
              <motion.div
                className="text-[#979380] text-lg text-center font-schoolbell mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p>
                  Mint your personal NFT stamp <br /> for just $2,22
                </p>
              </motion.div>
            )}
            {currentStep === 1 && (
              <motion.div
                className="text-[#979380] text-lg text-center font-schoolbell mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p>
                  Choose a recipient for your <br /> personalised moment
                </p>
              </motion.div>
            )}
            {currentStep === 2 && (
              <motion.div
                className="text-[#979380] text-lg font-schoolbell mt-2 text-center "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Pricing starts at $1,11 and increases with <br />
                recipient{"'"}s follower count. Recipients can claim
                <br />
                your moment as a tip.
              </motion.div>
            )}
          </motion.main>
        </motion.div>
      </AnimatePresence>

      {/* Footer - button always animates */}
      <motion.footer className="w-full max-w-md  flex justify-center items-center">
        <HandDrawnButton
          variant="primary"
          onClick={handleNext}
          size="lg"
          className="py-3 w-full font-schoolbell"
        >
          Next
        </HandDrawnButton>
      </motion.footer>
    </motion.div>
  );
};

export default Onboarding;
