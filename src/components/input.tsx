import type { ChapterMaterialCategory } from "../lib/types";

export const Input = ({
  label,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) => {
  return (
    <input
      name={label}
      className="px-4 py-2 rounded-full outline outline-primary-50 border border-primary/30"
      type={type}
      value={value}
      onChange={(e) => onChange(e)}
      placeholder={placeholder ?? "Masukkan nilai..."}
    />
  );
};

export const SelectInput = ({
  label,
  value,
  onChange,
  options,
}: {

  label: string;
  value: ChapterMaterialCategory;
  onChange: (value: ChapterMaterialCategory) => void;
  options: ChapterMaterialCategory[];
}) => {
  return (
    <select
      name={label}
      className="px-4 py-2 rounded-full outline outline-primary-50 border border-primary/30"
      value={value}
      onChange={(e) => onChange(e.target.value as ChapterMaterialCategory)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
