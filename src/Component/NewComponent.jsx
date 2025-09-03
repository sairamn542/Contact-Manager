import React, { useState } from "react";
import { Rnd } from "react-rnd";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;
const MIN_BAR_WIDTH = 50;
const BAR_INITIAL_WIDTH = 100;
const BAR_INITIAL_HEIGHT = 200;
const BAR_MARGIN = 10;

function BarChartCanvas() {
  const [bars, setBars] = useState([]);

  // Scales bars to fit in total width if needed
  const getScaledBars = () => {
    const totalOriginalWidth = bars.reduce(
      (sum, bar) => sum + bar.width + BAR_MARGIN,
      0
    );

    const availableWidth = CANVAS_WIDTH;
    const scale =
      totalOriginalWidth > availableWidth
        ? availableWidth / totalOriginalWidth
        : 1;

    let currentX = BAR_MARGIN;

    return bars.map((bar) => {
      const scaledWidth = bar.width * scale;
      const scaledBar = {
        ...bar,
        width: scaledWidth,
        x: currentX,
      };
      currentX += scaledWidth + BAR_MARGIN * scale;
      return scaledBar;
    });
  };

  // Handle right-click
  const handleRightClick = (e) => {
    e.preventDefault();

    const canvas = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - canvas.left;
    const clickY = e.clientY - canvas.top;

    const newBar = {
      id: Date.now(),
      width: BAR_INITIAL_WIDTH,
      height: BAR_INITIAL_HEIGHT,
      x: clickX,
      y: clickY,
    };

    setBars((prev) => [...prev, newBar]);
  };

  const updateBar = (id, updates) => {
    setBars((prev) =>
      prev.map((bar) => (bar.id === id ? { ...bar, ...updates } : bar))
    );
  };

  const scaledBars = getScaledBars();

  return (
    <div
      onContextMenu={handleRightClick}
      style={{
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        border: "1px solid black",
        position: "relative",
        margin: "40px auto",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Y Axis */}
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "2px",
          background: "black",
          left: 0,
          top: 0,
        }}
      />
      {/* X Axis */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "2px",
          background: "black",
          bottom: 0,
          left: 0,
        }}
      />

      {scaledBars.map((bar) => (
        <Rnd
          key={bar.id}
          size={{ width: bar.width, height: bar.height }}
          position={{
            x: bar.x,
            y: CANVAS_HEIGHT - bar.height,
          }}
          bounds="parent"
          minWidth={MIN_BAR_WIDTH}
          minHeight={20}
          onDragStop={(e, d) => {
            const newY = d.y;
            const newHeight = CANVAS_HEIGHT - newY;
            updateBar(bar.id, {
              height: newHeight,
            });
          }}
          onResizeStop={(e, dir, ref, delta, position) => {
            const newHeight = ref.offsetHeight;
            const newWidth = ref.offsetWidth;
            updateBar(bar.id, {
              height: newHeight,
              width: newWidth,
            });
          }}
          enableResizing={{
            top: true,
            bottom: true,
            left: true,
            right: true,
            topLeft: true,
            topRight: true,
            bottomLeft: true,
            bottomRight: true,
          }}
          dragAxis="both"
          style={{
            backgroundColor: "rgba(144, 238, 144, 0.7)",
            border: "1px solid red",
            borderRadius: "6px",
            cursor: "move",
          }}
        />
      ))}
    </div>
  );
}

export default BarChartCanvas;
