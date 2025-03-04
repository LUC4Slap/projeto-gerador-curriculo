import { NextPage } from 'next'

const Loading: NextPage = ({}) => {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 ">
      <svg
        className="w-20 h-20 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3.5-3.5L12 4l-4 4V4a8 8 0 01-4 8z"></path>
      </svg>
      <h1 className="my-[20px]">Gerar Currículo</h1>
    </div>
  );
}

export default Loading
