"use client";

import React, { useRef, useState, useEffect } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import Button from "./Button";
import { useRouter } from "next/navigation";
import HandDrawnButton from "./HandDrawnButton";
import { motion, AnimatePresence } from "framer-motion";

type StampCreatorProps = {
  backgroundColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
};

const StampCreator: React.FC<StampCreatorProps> = ({
  backgroundColor = "transparent",
  strokeColor = "#071FC0",
  strokeWidth = 6,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(true);
  const [stampImage, setStampImage] = useState<string | null>(null);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const [isMinting, setIsMinting] = useState(false);
  const [initialAnimationComplete, setInitialAnimationComplete] =
    useState(false);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const router = useRouter();

  // Set initialAnimationComplete to true after first render
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialAnimationComplete(true);
    }, 1000); // Wait for initial animations to complete

    return () => clearTimeout(timer);
  }, []);

  const handleClearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
      setIsCanvasEmpty(true);
    }
  };

  const handleUndoAction = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
      canvasRef.current.exportPaths().then((paths) => {
        setIsCanvasEmpty(paths.length === 0);
      });
    }
  };

  const handleDone = async () => {
    try {
      setIsExporting(true);
      if (canvasRef.current) {
        const dataUrl = await canvasRef.current.exportImage("png");
        setStampImage(dataUrl);
        setIsDrawingMode(false);
      }
    } catch (error) {
      console.error("Error creating stamp:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleMintNFT = async () => {
    try {
      setIsMinting(true);
      // Here you would implement the logic for minting the NFT

      // Simulate a successful mint with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Navigate to the feed page after successful minting
      router.push("/feed");
    } catch (error) {
      console.error("Error minting NFT:", error);
    } finally {
      setIsMinting(false);
    }
  };

  const handleReset = () => {
    setIsDrawingMode(true);
    setStampImage(null);
    setIsCanvasEmpty(true);
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
    }
  };

  const handleCanvasChange = () => {
    if (canvasRef.current) {
      canvasRef.current.exportPaths().then((paths) => {
        setIsCanvasEmpty(paths.length === 0);
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const buttonGroupVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const canvasVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-between p-6 overflow-auto"
      initial={!initialAnimationComplete ? "hidden" : { opacity: 1 }}
      animate="visible"
      variants={containerVariants}
    >
      {/* Header - Different text based on state */}
      <motion.header className="w-full max-w-md pt-2" variants={headerVariants}>
        <div className="flex flex-col items-center">
          <motion.div
            className="text-primary-blue text-2xl font-schoolbell text-center mt-10 h-[40px]"
            variants={itemVariants}
          >
            {!isDrawingMode && stampImage
              ? "And mint this as NFT:)"
              : "Let's create your stamp now"}
          </motion.div>
        </div>
      </motion.header>

      {/* Body - Conditionally render canvas or image */}
      <motion.main
        className="flex-1 flex flex-col items-center justify-center w-full max-w-md mt-2"
        variants={itemVariants}
      >
        <motion.div className="flex flex-col items-center h-[420px] mb-4">
          {!isDrawingMode && stampImage ? (
            <>
              <motion.div
                className="relative border-4 border-primary-blue rounded-lg overflow-hidden flex items-center justify-center aspect-square w-[340px] h-[340px]"
                variants={canvasVariants}
              >
                <img
                  src={stampImage}
                  alt="Your stamp"
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>
              <motion.p
                className="text-gray-600 text-center mt-4 text-md font-schoolbell"
                variants={itemVariants}
              >
                Each moment that you will create for someone
                <br /> will be signed with it
              </motion.p>
            </>
          ) : (
            <motion.div
              className={`relative border-4 rounded-lg overflow-hidden aspect-square w-[340px] h-[340px] ${
                isCanvasEmpty ? "border-gray-300" : "border-primary-blue"
              }`}
              variants={canvasVariants}
            >
              <ReactSketchCanvas
                ref={canvasRef}
                strokeWidth={strokeWidth}
                strokeColor={strokeColor}
                canvasColor={backgroundColor}
                style={{ width: "100%", height: "100%" }}
                onChange={handleCanvasChange}
              />
              {isCanvasEmpty && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none font-schoolbell"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  just draw something here :)
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </motion.main>

      {/* Footer - Different buttons based on state */}
      <motion.footer
        className="w-full max-w-md flex justify-center items-center"
        variants={buttonGroupVariants}
      >
        {!isDrawingMode && stampImage ? (
          <div className="flex gap-3 w-full">
            <HandDrawnButton
              onClick={handleReset}
              variant="ghost"
              useMdPath={true}
              className="font-schoolbell text-2xl"
            >
              Reset
            </HandDrawnButton>
            <HandDrawnButton
              onClick={handleMintNFT}
              disabled={isMinting}
              variant="primary"
              className="w-full font-schoolbell text-2xl"
            >
              {isMinting ? "Minting..." : "Mint NFT"}
            </HandDrawnButton>
          </div>
        ) : (
          <div className="flex gap-2 w-full">
            <HandDrawnButton
              onClick={handleClearCanvas}
              size="lg"
              useMdPath={true}
              className="font-schoolbell text-red-600 w-full"
            >
              Clear
            </HandDrawnButton>
            <HandDrawnButton
              onClick={handleUndoAction}
              size="lg"
              useMdPath={true}
              className="font-schoolbell text-primary-blue text-2xl w-full"
            >
              Undo
            </HandDrawnButton>
            <HandDrawnButton
              onClick={handleDone}
              size="lg"
              useMdPath={true}
              variant="primary"
              disabled={isExporting || isCanvasEmpty}
              className="font-schoolbell text-primary-blue text-2xl w-full"
            >
              {isExporting ? "..." : "Done"}
            </HandDrawnButton>
          </div>
        )}
      </motion.footer>
    </motion.div>
  );
};

export default StampCreator;
