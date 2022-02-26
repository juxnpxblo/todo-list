const setBgColor = (color) => {
  localStorage.setItem('bgColor', color);
  document.body.style.backgroundColor = color;
};

export default setBgColor;
