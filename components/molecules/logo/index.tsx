import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex items-center justify-start">
      <Image
        src="/logo-full.svg"
        alt="The Matrix Unlocked"
        width={443}
        height={150}
        priority
        className="w-[280px] h-auto md:w-[300px] lg:w-[340px]"
      />
    </div>
  );
};
