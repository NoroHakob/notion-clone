import Image from "next/image";

export const Heroes = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-[1000px] h-[400px] md:h-[500px] lg:h-[550px] rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/landingImage.png"
          fill
          className="object-contain scale-105"
          alt="App Mockup"
          priority
        />
        <Image
          src="/landingImageDark.png"
          fill
          className="object-contain hidden dark:block scale-105"
          alt="App Mockup"
          priority
        />
      </div>
    </div>
  );
};
