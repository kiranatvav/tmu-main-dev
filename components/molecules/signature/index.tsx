import Image from "next/image";

export const Signature = () => {
  return (
    <div className="flex items-center gap-4">
      {/* Left Column - TMU Logo */}
      <div className="flex items-center justify-center">
        <Image
          src="/logo-white.svg"
          alt="TMU Logo"
          width={65}
          height={61}
          className="w-[50px] h-auto md:w-[65px]"
        />
      </div>

      {/* Right Column - Signature and Text */}
      <div className="flex flex-col gap-1">
        {/* Row 1 - Frank's Signature (1/2 height) */}
        <div className="flex items-center">
          <Image
            src="/frank-signature.svg"
            alt="Frank Warrilk"
            width={146}
            height={35}
            className="w-[100px] h-auto md:w-[120px]"
          />
        </div>

        {/* Row 2 - Two lines of text */}
        <div className="flex flex-col">
          <p
            className="text-white text-[10px] md:text-[11px] leading-tight font-normal"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
          >
            Founder CEO, Visionary
          </p>
          <p
            className="text-white text-[10px] md:text-[11px] leading-tight font-normal"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
          >
            The Matrix Unlocked
          </p>
        </div>
      </div>
    </div>
  );
};
