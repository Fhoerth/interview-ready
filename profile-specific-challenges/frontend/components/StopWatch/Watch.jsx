import { forwardRef, useImperativeHandle, useCallback, useState, useRef, useEffect } from "react";
import { useAnimation } from "./useAnimation";
import { useInterval } from '../../hooks/useInterval';

const DISPLAY_VALUE_INTERVAL = 100;
const WATCH_SIZE = 200;
const TICK_SIZE = 12;
const BORDER_SIZE = 4;
const SPEED = 1 / 5;
const WATCH_INITIAL_VALUE = 0;

const Watch = forwardRef((_, ref) => {
  const [active, setActive] = useState(false);

  const [displayValue, setDisplayValue] = useState(WATCH_INITIAL_VALUE);

  const lastFrameTime = useRef(0);
  const value = useRef(WATCH_INITIAL_VALUE);
  const tickRef = useRef();

  const handleInterval = useCallback(() => {
    setDisplayValue((prevValue) => {
      return prevValue + DISPLAY_VALUE_INTERVAL;
    });
  }, [setDisplayValue]);

  const [startInterval, stopInterval] = useInterval(handleInterval, DISPLAY_VALUE_INTERVAL, false);
  const [startAnimation, stopAnimation] = useAnimation((now) => {
    if (lastFrameTime.current === 0) {
      lastFrameTime.current = now;
    }

    const { current } = value;

    const angleInDegrees = (360 / 1000) * (current * SPEED);
    const angleInRadians = (angleInDegrees * Math.PI) / 180;

    const center = WATCH_SIZE / 2 - TICK_SIZE / 2;
    const radius = center + BORDER_SIZE / 2 + TICK_SIZE / 2;

    const x = center + Math.sin(angleInRadians) * radius;
    const y = center - Math.cos(angleInRadians) * radius;

    value.current += (now - lastFrameTime.current);

    if (tickRef.current) {
      tickRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }

    lastFrameTime.current = now;
  });

  useImperativeHandle(
    ref,
    () => ({
      start: () => {
        setActive(true);
        startInterval();
        startAnimation();
      },
      pause: () => {
        stopAnimation();
        stopInterval();

        value.current = displayValue;
        lastFrameTime.current = 0;
      },
      reset: () => {
        setActive(false);
        stopInterval();
        stopAnimation();

        setDisplayValue(WATCH_INITIAL_VALUE);
        value.current = WATCH_INITIAL_VALUE;
        lastFrameTime.current = 0;
      },
    }),
    [setActive, setDisplayValue, startAnimation, stopAnimation]
  );

  const watchClassName = ["stop-watch__watch", active ? "stop-watch__watch-active" : null]
    .filter(Boolean)
    .join(" ");
  const tickClassName = ["stop-watch__tick", active ? "stop-watch__tick-active" : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="stop-watch__watch-layout">
      <div className={watchClassName}>
        {(displayValue / 1000).toFixed(2)}
        <div ref={tickRef} className={tickClassName} />
      </div>
    </div>
  );
});

export { Watch };
