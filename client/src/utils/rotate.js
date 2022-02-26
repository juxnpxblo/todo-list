const rotate = (ref, duration) => {
  ref.current.classList.add('rotate');
  setTimeout(() => {
    ref.current.classList.remove('rotate');
  }, duration);
};

export default rotate;
