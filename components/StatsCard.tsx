type Props = {
  title: string;
  value: number;
};

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">

      <p className="text-sm uppercase tracking-widest text-stone-500">
        {title}
      </p>

      <h2 className="mt-4 text-5xl font-black text-stone-800">
        {value}
      </h2>

    </div>
    
    
  );
}