import { Search } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';


interface ISearchBarProps {
  setSearch: Dispatch<SetStateAction<string>>;
  id: string;
  placeholder: string;
  labelClass?: string;
  inputClass?: string;
  register?: UseFormRegisterReturn<string>
}

export default function SearchBar({ setSearch, id, placeholder, labelClass, inputClass, register }: ISearchBarProps) {
  return (
    <label htmlFor={id} className={`relative ${labelClass}`}>
      <input
        id={id}
        type="text"
        autoComplete='off'
        placeholder={placeholder}
        className={`bg-gray-700 w-full py-2 pl-3 pr-13 rounded-lg outline-none ${inputClass}`}
        onChange={({ target: { value } }) => setSearch(value.trim())}
        {...register }
      />
      <Search className='absolute size-5 right-4 top-1/2 transform -translate-y-1/2' />
    </label>
  );
}
