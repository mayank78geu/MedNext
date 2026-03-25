const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg"
        alt="logo"
        className="h-8"
      />
      <span className="font-bold text-xl text-[#0c1a2e]">
        MedNext
      </span>
    </div>
  );
};

export default Logo;