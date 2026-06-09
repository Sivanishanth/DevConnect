export default function LoginRegisterStyle({type,placeholder,value,onChange})
{
    return(
        <input type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
        w-full
        px-4 py-3
        mb-4
        rounded-lg
        bg-gray-700
        border border-gray-600
        text-white
        placeholder-gray-400
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        transition
      "
    />
)}

