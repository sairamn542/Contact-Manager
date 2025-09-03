import React, { useState } from "react";
import { Rnd } from "react-rnd";
import "./dp.css";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;
const MIN_BAR_WIDTH = 50;
const MIN_BAR_HEIGHT = 50;
const BAR_INITIAL_WIDTH = 100;
const BAR_INITIAL_HEIGHT = 200;

function DragDropCanvas3() {
  const [bars, setBars] = useState([]);

  // --- helper to shift overlapping bars ---
  const fixOverlaps = (bars) => {
    const sorted = [...bars].sort((a, b) => a.x - b.x);
    let prevEnd = 0;
    return sorted.map((b) => {
      let newX = Math.max(b.x, prevEnd);
      prevEnd = newX + b.width;
      return { ...b, x: newX, y: CANVAS_HEIGHT - b.height }; // keep aligned bottom
    });
  };

  // --- normalize bars (fix overlap + shrink if needed) ---
  const normalizeBars = (bars) => {
    let newBars = fixOverlaps(bars);

    const totalWidth = newBars.reduce((sum, b) => sum + b.width, 0);
    if (totalWidth > CANVAS_WIDTH) {
      const scale = CANVAS_WIDTH / totalWidth;
      let currentX = 0;
      newBars = newBars.map((b) => {
        const newWidth = Math.max(MIN_BAR_WIDTH, b.width * scale);
        const adjusted = {
          ...b,
          width: newWidth,
          x: currentX,
          y: CANVAS_HEIGHT - b.height,
        };
        currentX += newWidth;
        return adjusted;
      });
    }

    return newBars;
  };

  // Add a new bar on right-click
  const handleRightClick = (e) => {
    e.preventDefault();
    const canvas = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - canvas.left;

    const newBar = {
      id: Date.now(),
      width: BAR_INITIAL_WIDTH,
      height: BAR_INITIAL_HEIGHT,
      x: clickX,
      y: CANVAS_HEIGHT - BAR_INITIAL_HEIGHT,
    };

    setBars((prev) => normalizeBars([...prev, newBar]));
  };

  // Update a bar (drag/resize)
  const updateBar = (id, updates) => {
    setBars((prev) => {
      let newBars = prev.map((bar) =>
        bar.id === id ? { ...bar, ...updates } : bar
      );
      return normalizeBars(newBars);
    });
  };

  return (
    <div
      onContextMenu={handleRightClick}
      className="canvas"
      style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
    >
      {bars.map((bar) => (
        <Rnd
          key={bar.id}
          size={{ width: bar.width, height: bar.height }}
          position={{ x: bar.x, y: bar.y }}
          bounds="parent"
          minWidth={MIN_BAR_WIDTH}
          minHeight={MIN_BAR_HEIGHT}
          onDragStop={(e, d) =>
            updateBar(bar.id, { x: d.x, y: CANVAS_HEIGHT - bar.height })
          }
          onResizeStop={(e, dir, ref, delta, pos) =>
            updateBar(bar.id, {
              width: ref.offsetWidth,
              height: ref.offsetHeight,
              x: pos.x,
              y: CANVAS_HEIGHT - ref.offsetHeight,
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
          className="bar"
        />
      ))}
    </div>
  );
}

export default DragDropCanvas3;
