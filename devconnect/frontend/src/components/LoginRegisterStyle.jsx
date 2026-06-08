export default function LoginRegisterStyle({type,placeholder,value,onChange})
{
    return(
        <input type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 w-full mb-4 focus:outline-none focus:border-b-black"/>
    )
}

