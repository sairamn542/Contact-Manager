import React, { useState } from "react";
import { Rnd } from "react-rnd";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;
const MIN_BAR_WIDTH = 50;
const MIN_BAR_HEIGHT = 50;
const BAR_INITIAL_WIDTH = 100;
const BAR_INITIAL_HEIGHT = 200;

function DragDropCanvas2() {
  const [bars, setBars] = useState([]);

  // Add a new box on right-click
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

  // Update position and size
  const updateBar = (id, updates) => {
    setBars((prev) =>
      prev.map((bar) => (bar.id === id ? { ...bar, ...updates } : bar))
    );
  };

  return (
    <div
      onContextMenu={handleRightClick}
      style={{
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        border: "1px solid black",
        margin: "40px auto",
        position: "relative",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {bars.map((bar) => (
        <Rnd
          key={bar.id}
          size={{ width: bar.width, height: bar.height }}
          position={{ x: bar.x, y: bar.y }}
          bounds="parent"
          minWidth={MIN_BAR_WIDTH}
          minHeight={MIN_BAR_HEIGHT}
          onDragStop={(e, d) => updateBar(bar.id, { x: d.x, y: d.y })}
          onResizeStop={(e, dir, ref, delta, pos) =>
            updateBar(bar.id, {
              width: ref.offsetWidth,
              height: ref.offsetHeight,
              x: pos.x,
              y: pos.y,
            })
          }
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

export default DragDropCanvas2;
