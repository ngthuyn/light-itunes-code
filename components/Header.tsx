import Image from "next/image";

export default function Header() {
  return (
    <header className="mb-8 text-center">
      {/* Banner */}
      <div className="relative mx-auto aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-3xl shadow-xl shadow-black/30">
        <Image
          src="/lighT.jpe"
          alt="lighT"
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover"
          priority
        />
      </div>

      {/* VẾT THƯƠNG */}
      <div className="mt-5 flex justify-center">
        <Image
          src="/vet_thuong.png"
          alt="VẾT THƯƠNG"
          width={500}
          height={150}
          className="h-auto w-auto max-w-[80%]"
          priority
        />
      </div>

      <p className="mt-1 text-xl text-[#a96a78]">
        SUPPORT lighT DEBUT SINGLE
      </p>
    </header>
  );
}