import Link from "next/link";

export const Disclaimer = () => {
  return (
    <div className="w-full bg-black border-t border-white/10 py-8 px-4 mt-auto relative z-20">
      <div className="max-w-7xl flex flex-col gap-6 md:flex-row justify-between items-center mx-auto">
        {/* Disclaimer Text */}
        {/* <div className="text-center mb-4">
          <p className="text-xs leading-relaxed text-[#FFFFFF]">
            The Matrix Unlocked provides education only. Trading involves risk
            of loss and is not suitable for everyone. Past performance is not
            necessarily indicative of future results.
          </p>
        </div> */}

        {/* Copyright */}
        <div className="text-center ">
          <p className="text-xs text-[#FFFFFF]">
            © {new Date().getFullYear()} Copyright The Matrix Unlocked. All
            rights reserved.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center items-center gap-1.5 text-xs">
          <Link
            href="/privacy"
            className="text-[#FFFFFF] hover:text-[#00ff05] transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          <span className="bg-[#FFFFFF] inline-block w-[1px] h-3"></span>
          <Link
            href="/terms"
            className="text-[#FFFFFF] hover:text-[#00ff05] transition-colors duration-200"
          >
            Terms of Service
          </Link>
          <span className="bg-[#FFFFFF] inline-block w-[1px] h-3"></span>
          <Link
            href="/disclaimer"
            className="text-[#FFFFFF] hover:text-[#00ff05] transition-colors duration-200"
          >
            Disclaimer
          </Link>
        </div>
      </div>
    </div>
  );
};
