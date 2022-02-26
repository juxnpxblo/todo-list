const PickBgColor = ({ color }) => {
  return (
    <div
      className="bg-color cursor-pointer w-[24px] h-[24px] border-2 rounded-md border-[#262626]"
      style={{ backgroundColor: color }}
    ></div>
  );
};

export default PickBgColor;
