"use client";

import React, { useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import Button from "./Button";

type StampCreatorProps = {
  backgroundColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
};

const StampCreator: React.FC<StampCreatorProps> = ({
  backgroundColor = "transparent",
  strokeColor = "#071FC0",
  strokeWidth = 4,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(true);
  const [stampImage, setStampImage] = useState<string | null>(null);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

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

  const handleRedoAction = () => {
    if (canvasRef.current) {
      canvasRef.current.redo();
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

  const handleReset = () => {
    setIsDrawingMode(true);
    setIsCanvasEmpty(true);
  };

  const handleCanvasChange = () => {
    if (canvasRef.current) {
      canvasRef.current.exportPaths().then((paths) => {
        setIsCanvasEmpty(paths.length === 0);
      });
    }
  };

  if (!isDrawingMode && stampImage) {
    return (
      <div className="flex flex-col items-center">
        <div
          className="relative border-4 border-primary-blue rounded-lg overflow-hidden flex items-center justify-center"
          style={{ width: 340, height: 340 }}
        >
          <img
            src={stampImage}
            alt="Your stamp"
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div className="flex mt-4">
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className={`relative border-4 rounded-lg overflow-hidden ${
          isCanvasEmpty ? "border-gray-300" : "border-primary-blue"
        }`}
        style={{ width: 340, height: 340 }}
      >
        <ReactSketchCanvas
          ref={canvasRef}
          strokeWidth={strokeWidth}
          strokeColor={strokeColor}
          canvasColor={backgroundColor}
          style={{ width: "100%", height: "100%" }}
          onChange={handleCanvasChange}
        />
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap mt-4 gap-2 sm:gap-3 justify-center w-full">
        <button
          onClick={handleClearCanvas}
          className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-schoolbell"
        >
          Clear
        </button>
        <button
          onClick={handleUndoAction}
          className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-schoolbell"
        >
          Undo
        </button>
        <button
          onClick={handleRedoAction}
          className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-schoolbell"
        >
          Redo
        </button>
        <Button onClick={handleDone} disabled={isExporting} className="text-lg">
          {isExporting ? "Processing..." : "Done"}
        </Button>
      </div>
    </div>
  );
};

export default StampCreator;
