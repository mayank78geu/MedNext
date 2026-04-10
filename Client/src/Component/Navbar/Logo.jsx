import { HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 cursor-pointer">
      <HeartPulse className="h-8 w-8 text-blue-600" />
      <span className="font-bold text-xl text-[#0c1a2e]">
        MedNext
      </span>
    </Link>
  );
};

export default Logo;