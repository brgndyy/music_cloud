"use client";

import React, { RefObject, useRef, useState, useEffect } from "react";
import { canvas_container } from "@/app/_styles/canvas.css";

type MouseType = {
  x?: number;
  y?: number;
  radius: number;
};

class Particle {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.baseX = this.x;
    this.baseY = this.y;

    this.size = 3;

    this.density = Math.random() * 40 + 5;
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }

  update(mouse: MouseType) {
    if (mouse.x === undefined || mouse.y === undefined) {
      return;
    }
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}

const mouse: MouseType = {
  x: undefined,
  y: undefined,
  radius: 200,
};

export default function Canvas() {
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth * 0.5;
      canvas.height = window.innerHeight * 0.5;
      const context = canvas.getContext("2d");
      setCtx(context);
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (canvasRef.current) {
        mouse.x = event.x - canvasRef.current.offsetLeft;
        mouse.y = event.y - canvasRef.current.offsetTop;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [canvasRef]);

  useEffect(() => {
    if (ctx) {
      let particleArray: Particle[] = [];
      ctx.fillStyle = "white";
      ctx.font = "10px Verdana";
      ctx?.fillText("Music Cloud", 0, 30);

      const textCoordinates = ctx.getImageData(0, 0, 100, 100);
      const adjustX = 10;
      const adjustY = 10;

      function init() {
        if (canvasRef.current) {
          particleArray = [];

          for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
            for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
              if (
                textCoordinates.data[
                  y * 4 * textCoordinates.width + x * 4 + 3
                ] > 128
              ) {
                let positionX = x;
                let positionY = y;
                particleArray.push(
                  new Particle(positionX * 10, positionY * 10)
                );
              }
            }
          }
        }
      }

      init();
      function animate() {
        if (ctx && canvasRef.current) {
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );

          for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].draw(ctx);
            particleArray[i].update(mouse);
          }

          requestAnimationFrame(animate);
        }
      }

      animate();
    }
  }, [ctx]);
  return (
    <>
      <canvas ref={canvasRef} className={canvas_container}></canvas>
    </>
  );
}
