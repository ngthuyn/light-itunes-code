import Image from "next/image";

export default function Header() {
  return (
    <header className="mb-8 text-center">
      <div className="relative mx-auto h-64 w-full max-w-4xl overflow-hidden rounded-3xl shadow-xl shadow-black/30 sm:h-72 lg:h-80">
        <Image
          src="/img_itunes.jpg"
          alt="Album Cover"
          fill
          className="object-cover"
          priority
        />
      </div>

      <h2 className="mt-5 text-5xl font-black tracking-[6px] text-[#b52b4b]">
        VẾT THƯƠNG
      </h2>

      <p className="mt-2 text-base text-[#d04a66]">
        lài tì lái ti
      </p>

      <p className="mt-1 text-sm text-[#a96a78]">
        Support lighT&apos;s new song
      </p>
    </header>
  );
}