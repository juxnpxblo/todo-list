const calcHeight = (ref) => {
  ref.current.style.height = '1px';
  ref.current.style.height = ref.current.scrollHeight + 'px';
};

export default calcHeight;
