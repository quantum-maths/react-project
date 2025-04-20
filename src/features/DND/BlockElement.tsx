import React, { use } from "react";
import { Block } from "./types";
import { rnd_styles } from "./utils";
import { Rnd } from "react-rnd";
import "./styles.css";
import { CanvasContext } from "./CanvasContainer";

interface BlockElementProps {
  data: Block;
}

const BlockElement: React.FC<BlockElementProps> = ({ data }) => {
  const { bringToFront, updateBlock, deleteBlock } = use(CanvasContext);

  return (
    <Rnd
      size={{ width: data.width, height: data.height }}
      position={{ x: data.x, y: data.y }}
      bounds="parent"
      minWidth={100}
      minHeight={40}
      dragGrid={[10, 10]}
      resizeGrid={[10, 10]}
      style={
        {
          zIndex: data.zIndex,
          ...rnd_styles,
        } as React.CSSProperties
      }
      onDragStop={(_, d) => updateBlock(data.id, { x: d.x, y: d.y })}
      onResizeStop={(_, __, ref, ___, position) =>
        updateBlock(data.id, {
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
          x: position.x,
          y: position.y,
        })
      }
      onClick={() => bringToFront(data.id)}
    >
      Block {data.id}
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteBlock(data.id);
        }}
        className="close-icon-btn"
      >
        ✕
      </button>
    </Rnd>
  );
};

export default BlockElement;
