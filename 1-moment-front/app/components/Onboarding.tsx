"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./Button";
import { motion, AnimatePresence } from "framer-motion";

type OnboardingStep = {
  description: string;
  subtext?: string;
  illustration: string;
};

interface OnboardingProps {
  onComplete: () => void;
}

const onboardingSteps: OnboardingStep[] = [
  {
    description: "wtf is that!?",
    subtext: "1. Draw and mint your unique NFT stamp",
    illustration: "/1-screen.svg",
  },
  {
    description: "wtf is that!?",
    subtext: "1. Find someone with who you want to share yours moment",
    illustration: "/2-screen.svg",
  },
  {
    description: "wtf is that!?",
    subtext: "1. Create your moment, and sign with your NFT",
    illustration: "/3-screen.svg",
  },
];

// Anima// const containerVariants = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: 1,
// //     transition: {
// //       when: "beforeChildren",
// //       //   staggerChildren: 0.2,
// //       duration: 0.3,
// //     },
// //   },
// //   exit: {
// //     opacity: 0,
// //     transition: { duration: 0.15 },
// //   },
// // };
// //
// // const itemVariants = {
// //   hidden: { y: 20, opacity: 0 },
// //   visible: {
// //     y: 0,
// //     opacity: 1,
// //     transition: { duration: 0.15 },
// //   },
// // };
// //
// // const illustrationVariants = {
// //   hidden: { scale: 0.8, opacity: 0 },
// //   visible: {
// //     scale: 1,
// //     opacity: 1,
// //     transition: {
// //       type: "spring",
// //       stiffness: 100,
// //       damping: 15,
// //     },
// //   },
// // };
// //
// // const buttonVariants = {
// //   initial: { scale: 1 },
// //   hover: {
// //     scale: 1.05,
// //     backgroundColor: "#071FC0",
// //     color: "#ffffff",
// //     transition: { duration: 0.2 },
// //   },
// //   tap: { scale: 0.98 },
// // };tion variants

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [initialAnimationComplete, setInitialAnimationComplete] =
    useState(false);

  // Set initialAnimationComplete to true after first render
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialAnimationComplete(true);
    }, 1000); // Wait for initial animations to complete

    return () => clearTimeout(timer);
  }, []);

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
        className="w-full max-w-md pt-4"
        initial={!initialAnimationComplete ? { y: -20, opacity: 0 } : false}
        animate={
          !initialAnimationComplete ? { y: 0, opacity: 1 } : { opacity: 1 }
        }
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            className="rounded-md p-2 mb-2"
            initial={!initialAnimationComplete ? { y: -50, opacity: 0 } : false}
            animate={
              !initialAnimationComplete ? { y: 0, opacity: 1 } : { opacity: 1 }
            }
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <Image src="/Logo.svg" alt="1moment" width={235} height={60} />
          </motion.div>
          <motion.div
            className="text-[#979380] text-2xl font-schoolbell"
            initial={!initialAnimationComplete ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
          >
            {currentStepData.description}
          </motion.div>
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
              <Image
                src={currentStepData.illustration}
                alt={`Onboarding step ${currentStep + 1}`}
                width={300}
                height={200}
                className="mx-auto"
              />
            </motion.div>

            <motion.div
              className="text-[#071FC0] text-2xl mt-6 mb-2 font-schoolbell w-[320px] text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {currentStepData.subtext}
            </motion.div>

            {currentStep === 0 && (
              <motion.div
                className="text-[#979380] text-lg font-schoolbell mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                only for $2.22 :D
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                className="text-[#979380] text-sm font-schoolbell mt-2 text-center max-w-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Each moment has it own cost, and your recipient will be able to
                claim it as a tip
              </motion.div>
            )}
          </motion.main>
        </motion.div>
      </AnimatePresence>

      {/* Footer - button always animates */}
      <motion.footer className="w-full max-w-md pb-4">
        <Button
          onClick={handleNext}
          className="w-full py-3 text-xl font-schoolbell"
        >
          Next
        </Button>
      </motion.footer>
    </motion.div>
  );
};

export default Onboarding;
