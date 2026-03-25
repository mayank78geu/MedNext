import Button from "../Button/Button";

const MobileMenu = ({ open, setOpen }) => {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)}>✖</button>
        </div>

        <div className="flex flex-col gap-5 px-6 text-[#64748B]">
          <Button text="Find Care" />
          <Button text="Doctor Portal" />
          <Button text="Admin Portal" />

          <Button
            text="Book Appointment"
            className="bg-sky-500 text-white p-2 rounded hover:bg-sky-600"
          />
        </div>
      </div>
    </>
  );
};

export default MobileMenu;