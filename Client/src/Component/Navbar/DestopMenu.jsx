import Button from "../Button/Button";
const DesktopMenu = () => {
  return (
    <div className="hidden md:flex gap-6 text-[#64748B]">
      <Button text="Find Care" />
      <Button text="Doctor Portal" />
      <Button text="Admin Portal" />
    </div>
  );
};

export default DesktopMenu;
