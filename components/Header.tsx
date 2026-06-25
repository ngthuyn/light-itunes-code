import Image from "next/image";

export default function Header() {
  return (
    <header className="mb-14 text-center">

      <div className="relative mx-auto h-80 w-52 overflow-hidden rounded-3xl shadow-2xl">

        <Image
          src="/lighT_tamh2.jpg"
          alt="Album Cover"
          fill
          className="object-cover"
          priority
        />

      </div>

      <h1 className="mt-8 text-6xl font-black tracking-[10px] text-rose-800">
        Tên bài hát
      </h1>

      <p className="mt-3 text-lg text-rose-500">
        lài tì lái ti 
      </p>

      <p className="mt-1 text-rose-400">
        Support lighT's new song
      </p>

    </header>
  );
}