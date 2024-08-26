import { useCallback, useMemo, useState } from 'react';

const RangeInputInner = {
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  mask: 'linear-gradient(90deg,transparent 0,#000 2em,#000 calc(50% - 3em),transparent 50%,#000 calc(50% + 3em),#000 calc(100% - 2em),transparent)',
  cursor: 'grab',
};

export default function ImageRotator({ rotate, setRotate }) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  }, []);

  const clampRotate = useCallback((value) => {
    return Math.max(-45, Math.min(45, value));
  }, []);

  const calculateTranslateX = useCallback((rotateValue) => {
    if (rotateValue === 0) return -10;
    if (rotateValue > 0) {
      return -10 - (rotateValue / 45) * 200; // 0 to 45 degrees
    } else {
      return -10 + (Math.abs(rotateValue) / 45) * 200; // 0 to -45 degrees
    }
  }, []);

  const translateX = useMemo(
    () => calculateTranslateX(rotate),
    [rotate, calculateTranslateX]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        const movement = e.clientX - startX;
        const rotateChange = (movement / 4) * -1; // Reverse direction and adjust sensitivity
        setRotate((prevRotate) => clampRotate(prevRotate + rotateChange));
        setStartX(e.clientX);
      }
    },
    [clampRotate, isDragging, setRotate, startX]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className="relative flex justify-center">
      <span className="absolute bottom-[18px] text-sm">
        {parseInt(rotate)}°
      </span>
      <div
        style={RangeInputInner}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          style={{
            transform: `translateX(${translateX}px) translateY(0px)`,
          }}
        >
          <svg
            width="404"
            height="56"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 404 56"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M202 24 l2 3 l-2 -1 l-2 1 z"></path>
            <rect rx="4" ry="4" y="24" height="8"></rect>
            <path
              fillRule="evenodd"
              d="M 0 28 a 2 2 0 1 0 0 -1 M 11.25 28 a 0.75 0.75 0 1 0 0 -1 M 21.25 28 a 0.75 0.75 0 1 0 0 -1 M 31.25 28 a 0.75 0.75 0 1 0 0 -1 M 41.25 28 a 0.75 0.75 0 1 0 0 -1 M 50 28 a 2 2 0 1 0 0 -1 M 61.25 28 a 0.75 0.75 0 1 0 0 -1 M 71.25 28 a 0.75 0.75 0 1 0 0 -1 M 81.25 28 a 0.75 0.75 0 1 0 0 -1 M 91.25 28 a 0.75 0.75 0 1 0 0 -1 M 100 28 a 2 2 0 1 0 0 -1 M 111.25 28 a 0.75 0.75 0 1 0 0 -1 M 121.25 28 a 0.75 0.75 0 1 0 0 -1 M 131.25 28 a 0.75 0.75 0 1 0 0 -1 M 141.25 28 a 0.75 0.75 0 1 0 0 -1 M 150 28 a 2 2 0 1 0 0 -1 M 161.25 28 a 0.75 0.75 0 1 0 0 -1 M 171.25 28 a 0.75 0.75 0 1 0 0 -1 M 181.25 28 a 0.75 0.75 0 1 0 0 -1 M 191.25 28 a 0.75 0.75 0 1 0 0 -1 M 200 28 a 2 2 0 1 0 0 -1 M 211.25 28 a 0.75 0.75 0 1 0 0 -1 M 221.25 28 a 0.75 0.75 0 1 0 0 -1 M 231.25 28 a 0.75 0.75 0 1 0 0 -1 M 241.25 28 a 0.75 0.75 0 1 0 0 -1 M 250 28 a 2 2 0 1 0 0 -1 M 261.25 28 a 0.75 0.75 0 1 0 0 -1 M 271.25 28 a 0.75 0.75 0 1 0 0 -1 M 281.25 28 a 0.75 0.75 0 1 0 0 -1 M 291.25 28 a 0.75 0.75 0 1 0 0 -1 M 300 28 a 2 2 0 1 0 0 -1 M 311.25 28 a 0.75 0.75 0 1 0 0 -1 M 321.25 28 a 0.75 0.75 0 1 0 0 -1 M 331.25 28 a 0.75 0.75 0 1 0 0 -1 M 341.25 28 a 0.75 0.75 0 1 0 0 -1 M 350 28 a 2 2 0 1 0 0 -1 M 361.25 28 a 0.75 0.75 0 1 0 0 -1 M 371.25 28 a 0.75 0.75 0 1 0 0 -1 M 381.25 28 a 0.75 0.75 0 1 0 0 -1 M 391.25 28 a 0.75 0.75 0 1 0 0 -1 M 400 28 a 2 2 0 1 0 0 -1"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
