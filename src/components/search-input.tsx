import React from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

let timeOut: NodeJS.Timeout | null = null;

const SearchInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange?: (value: string) => void;
}) => {
  const [q, setQ] = React.useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQ(value);
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
      onChange?.(value);
    }, 1000);
  };

  return (
    <div className="relative w-full max-w-xl">
      <SearchIcon
        size={16}
        className="absolute left-3 top-1/2 z-50 -translate-y-1/2 transform text-neutral-400"
      />
      <Input
        value={q}
        onChange={handleChange}
        placeholder="Search clips"
        className="w-full pl-10"
      />
    </div>
  );
};

export default SearchInput;
