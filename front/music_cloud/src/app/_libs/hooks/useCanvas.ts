import { RefObject, useRef, useState, useEffect, useCallback } from "react";

export const useCanvas = () => {
  const [canvasRefs, setCanvasRefs] = useState<
    Record<number, HTMLCanvasElement | null>
  >({});

  const registerCanvasRef = useCallback(
    (id: number, ref: HTMLCanvasElement) => {
      setCanvasRefs((refs) => ({
        ...refs,
        [id]: ref,
      }));
    },
    []
  );
};
