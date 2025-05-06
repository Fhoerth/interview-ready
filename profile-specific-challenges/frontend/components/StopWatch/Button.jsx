const Button = ({ onClick, content, className }) => {
  const buttonClassName = [className, 'stop-watch__button'].filter(Boolean).join(' ');

  return (
    <button onClick={onClick} className={buttonClassName}>
      {content}
    </button>
  );
};

export { Button };
