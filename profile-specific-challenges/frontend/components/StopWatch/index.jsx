import { useRef, useState } from "react";

import { Buttons } from "./Buttons";
import { Watch } from "./Watch";

const StopWatch = () => {
  const [showPlayButton, setShowPlayButton] = useState(true);
  const watchRef = useRef();

  function handleOnStart() {
    watchRef.current.start();
    setShowPlayButton(false);
  }

  function handleOnPause() {
    watchRef.current.pause();
    setShowPlayButton(true);
  }

  function handleOnReset() {
    watchRef.current.reset();
    setShowPlayButton(true);
  }

  return (
    <div className="stop-watch">
      <div className="stop-watch__layout">
        <Watch ref={watchRef} />
        <Buttons
          showPlayButton={showPlayButton}
          onStart={handleOnStart}
          onPause={handleOnPause}
          onReset={handleOnReset}
        />
      </div>
    </div>
  );
};

export { StopWatch };
