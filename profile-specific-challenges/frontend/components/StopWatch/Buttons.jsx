import { Button } from './Button';

const Buttons = ({ showPlayButton = false, onStart, onPause, onReset }) => {
  return (
    <div className="stop-watch__buttons">
      {showPlayButton && <Button content="▶" className="stop-watch__button-play" onClick={onStart} />}
      {!showPlayButton && (
        <>
          <Button content="⏸" onClick={onPause} />
          <Button content="⟳" className="stop-watch__button-refresh" onClick={onReset} />
        </>
      )}
    </div>
  );
};

export { Buttons };
