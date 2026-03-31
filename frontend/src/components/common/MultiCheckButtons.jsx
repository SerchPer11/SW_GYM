import { useEffect, useState } from "react";
import { CardBox } from "@/components/common/CardBox";

export function MultiCheckButtons({
  options = [],
  name,
  defaultValues = [],
  error,
  title
}) {
  const [selectedValues, setSelectedValues] = useState(defaultValues);

  useEffect(() => {
    const validOptionValues = new Set(options.map((option) => option.value));
    setSelectedValues((prev) =>
      prev.filter((value) => validOptionValues.has(value)),
    );
  }, [options]);

  const toggleValue = (value) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  return (
    <div>
    {title && <h3 className="text-sm font-medium mb-2 text-slate-700">{title}</h3>}
    <CardBox variant="pressed">
      <div className="grid grid-cols-2 overflow-y-auto max-h-48 p-2 space-y-1">
        {options.map((option) => (
          <div
            key={option.value}
            className="flex items-center space-x-2 text-sm text-slate-700"
          >
            <input
              type="checkbox"
              id={option.value}
              name={name}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => toggleValue(option.value)}
              className="rounded-lg bg-slate-700 text-slate-700"
            />
              <label htmlFor={option.value} className="cursor-pointer max-w-sm">
                {option.label}
              </label>
          </div>
        ))}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </CardBox>
    </div>
  );
}
