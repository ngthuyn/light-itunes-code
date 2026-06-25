type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="mb-6">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="🔍 Tìm theo fandom hoặc email..."
        className="w-full rounded-xl border border-stone-300 bg-white p-4 outline-none focus:border-stone-700"
      />
    </div>
  );
}