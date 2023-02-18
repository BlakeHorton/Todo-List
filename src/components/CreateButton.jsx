export default function CreateButton(props) {
  return (
    <button
      className="rounded-full p-3 bg-white text-slate-800 shadow-xl border hover:bg-gray-50 hover:duration-0 transition-colors active:bg-gray-100 active:scale-95 fixed bottom-20 right-20"
      onClick={props.onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  )
}
