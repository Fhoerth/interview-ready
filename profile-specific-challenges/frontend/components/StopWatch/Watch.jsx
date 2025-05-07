import { forwardRef, useImperativeHandle, useState, useCallback, useMemo } from "react";
import { useInterval } from "../../hooks/useInterval";

const INTERVAL = 20;
const WATCH_SIZE = 200;
const TICK_SIZE = 12;
const BORDER_SIZE = 4;
const SPEED = 1/5;

const Watch = forwardRef((_, ref) => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState(0);

  const handleInterval = useCallback(() => {
    setValue((prevValue) => {
      return prevValue + INTERVAL;
    });
  }, [value, setValue]);

  const [start, stop] = useInterval(handleInterval, INTERVAL, false);

  useImperativeHandle(
    ref,
    () => ({
      start: () => {
        setActive(true);
        start();
      },
      pause: () => {
        stop();
      },
      reset: () => {
        setActive(false);
        setValue(0);
        stop();
      },
    }),
    [setActive, setValue, start, stop]
  );

  const fixedValue = (value / 1000).toFixed(2);

  const angleInDegrees = (360 / 1000) * (value * SPEED);
  const angleInRadians = (angleInDegrees * Math.PI) / 180;

  const center = WATCH_SIZE / 2 - TICK_SIZE / 2;
  const radius = center + BORDER_SIZE / 2 + TICK_SIZE / 2;

  const x = center + Math.sin(angleInRadians) * radius;
  const y = center - Math.cos(angleInRadians) * radius;

  const watchClassName = ["stop-watch__watch", active ? "stop-watch__watch-active" : null]
    .filter(Boolean)
    .join(" ");
  const tickClassName = ["stop-watch__tick", active ? "stop-watch__tick-active" : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="stop-watch__watch-layout">
      <div className={watchClassName}>
        {fixedValue}
        <div className={tickClassName} style={{ left: x, top: y }} />
      </div>
    </div>
  );
});

export { Watch };
