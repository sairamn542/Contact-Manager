import React, { useState } from "react";
import { Rnd } from "react-rnd";

function DragResizeBox() {
  const [boxes, setBoxes] = useState([]);

  const BOX_WIDTH = 200;
  const BOX_HEIGHT = 100;
  const PARENT_WIDTH = 800;
  const PARENT_HEIGHT = 600;

  // Check overlap
  const isOverlapping = (newBox, others, ignoreId = null) => {
    return others.some(
      (box) =>
        box.id !== ignoreId &&
        newBox.x < box.x + box.width &&
        newBox.x + newBox.width > box.x &&
        newBox.y < box.y + box.height &&
        newBox.y + newBox.height > box.y
    );
  };

  // Find free spot if overlapping
  const findFreePosition = (newBox, others) => {
    let adjusted = { ...newBox };

    while (isOverlapping(adjusted, others, newBox.id)) {
      adjusted.x += 20; // push right
      if (adjusted.x + adjusted.width > PARENT_WIDTH) {
        adjusted.x = 0;
        adjusted.y += 20; // push down if no horizontal space
      }
      if (adjusted.y + adjusted.height > PARENT_HEIGHT) {
        break; // no space left
      }
    }
    return adjusted;
  };

  const handleDoubleClick = (e) => {
    const parent = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - parent.left - BOX_WIDTH / 2;
    let y = e.clientY - parent.top - BOX_HEIGHT / 2;

    if (x < 0) x = 0;
    if (y < 0) y = 0;

    const newBox = {
      id: Date.now(),
      x,
      y,
      width: BOX_WIDTH,
      height: BOX_HEIGHT,
    };

    const adjusted = findFreePosition(newBox, boxes);
    setBoxes((prev) => [...prev, adjusted]);
  };

  const updateBox = (id, data) => {
    setBoxes((prev) => {
      const updatedBoxes = prev.map((box) =>
        box.id === id ? { ...box, ...data } : box
      );
      const movedBox = updatedBoxes.find((b) => b.id === id);
      const adjusted = findFreePosition(movedBox, updatedBoxes);
      return updatedBoxes.map((box) =>
        box.id === id ? adjusted : box
      );
    });
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      style={{
        width: `${PARENT_WIDTH}px`,
        height: `${PARENT_HEIGHT}px`,
        border: "2px solid #333",
        margin: "20px auto",
        position: "relative",
        background: "#f9f9f9",
        overflow: "hidden",
      }}
    >
      {boxes.map((box) => (
        <Rnd
          key={box.id}
          size={{ width: box.width, height: box.height }}
          position={{ x: box.x, y: box.y }}
          bounds="parent"
          onDragStop={(e, d) =>
            updateBox(box.id, { x: d.x, y: d.y })
          }
          onResizeStop={(e, dir, ref, delta, pos) =>
            updateBox(box.id, {
              width: ref.offsetWidth,
              height: ref.offsetHeight,
              ...pos,
            })
          }
          style={{
            border: "2px dashed #007bff",
            background: "#e9f2ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "move",
          }}
        >
          Box {box.id}
        </Rnd>
      ))}
    </div>
  );
}

export default DragResizeBox;
