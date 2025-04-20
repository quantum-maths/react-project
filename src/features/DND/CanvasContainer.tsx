import React, { useEffect, useState, useRef, createContext } from "react";
import "./styles.css";
import { Block } from "./types";
import BlockElement from "./BlockElement";
import Button from "../../components/Button/Button";

const DEFAULT_BLOCKS: Block[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  x: 50 + i * 20,
  y: 50 + i * 20,
  width: 300,
  height: 100,
  zIndex: i + 1,
}));

const LOCAL_STORAGE_KEY = "interactive_workspace_blocks";

export interface ContextInterface {
  bringToFront: (id: number) => void;
  updateBlock: (id: number, newProps: Partial<Block>) => void;
  deleteBlock: (id: number) => void;
}

export const CanvasContext = createContext<ContextInterface>({
  bringToFront: (_id: number): void => {},
  updateBlock: (_id: number, _newProps: Partial<Block>): void => {},
  deleteBlock: (_id: number): void => {},
});

const Workspace: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [maxZ, setMaxZ] = useState<number>(5);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed: Block[] = JSON.parse(saved);
        setBlocks(parsed);
        const highestZ = parsed.reduce((max, b) => Math.max(max, b.zIndex), 0);
        setMaxZ(highestZ);
      } catch (err) {
        console.error("Failed to parse saved blocks:", err);
        setBlocks(DEFAULT_BLOCKS);
      }
    } else {
      setBlocks(DEFAULT_BLOCKS);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(blocks));
  }, [blocks]);

  const bringToFront = (id: number) => {
    const newZ = maxZ + 1;
    setMaxZ(newZ);
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, zIndex: newZ } : b))
    );
  };

  const updateBlock = (id: number, newProps: Partial<Block>) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...newProps } : b))
    );
  };

  const deleteBlock = (id: number) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const resetBlocks = () => {
    setBlocks(DEFAULT_BLOCKS);
    setMaxZ(5);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const context: ContextInterface = {
    bringToFront,
    updateBlock,
    deleteBlock,
  };

  return (
    <div className="canvas-container">
      <Button onClick={resetBlocks} className="reset-btn">
        Reset
      </Button>
      <div className="blocks-data">
        <CanvasContext.Provider value={context}>
          {blocks.map((block) => (
            <BlockElement data={block} key={block.id} />
          ))}
        </CanvasContext.Provider>
      </div>
    </div>
  );
};

export default Workspace;
