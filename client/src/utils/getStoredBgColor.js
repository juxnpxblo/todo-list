const getStoredBgColor = () => {
  return (
    localStorage.getItem('bgColor') ||
    localStorage.setItem('bgColor', '#ffffff') ||
    localStorage.getItem('bgColor')
  );
};

export default getStoredBgColor;
