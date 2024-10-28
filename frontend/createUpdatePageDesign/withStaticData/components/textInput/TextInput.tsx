// TextInput.tsx
import React from "react";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  required = false,
  type = "text",
  placeholder,
}) => {
  return (
    <div className="mt-4">
      <label className="block text-sm font-semibold text-gray-500">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-lg p-3 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm hover:border-blue-300"
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
