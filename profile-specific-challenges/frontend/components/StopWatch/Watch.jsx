import { forwardRef, useImperativeHandle, useState, useCallback, useMemo } from "react";
import { useInterval } from "../../hooks/useInterval";

const Watch = forwardRef((_, ref) => {
  const timer = useMemo(() => 100, []);

  const [active, setActive] = useState(false);
  const [value, setValue] = useState(0);

  const handleInterval = useCallback(() => {
    setValue((prevValue) => {
      return prevValue + timer;
    });
  }, [timer, value, setValue]);

  const [start, stop] = useInterval(handleInterval, timer, false);

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

  const normalizedValue = (value / 1000).toFixed(2);
  const watchClassName = ["stop-watch__watch", active ? "stop-watch__watch-active" : null]
    .filter(Boolean)
    .join(" ");
  const tickClassName = ["stop-watch__tick", active ? "stop-watch__tick-active" : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="stop-watch__watch-layout">
      <div className={watchClassName}>
        {normalizedValue}
        <div className={tickClassName} />
      </div>
    </div>
  );
});

export { Watch };
