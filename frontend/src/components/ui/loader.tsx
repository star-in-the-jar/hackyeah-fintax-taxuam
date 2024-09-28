const Loader = () => {
  return (
    <div className="bg-white py-3 rounded-lg ml-4 w-fit max-w-xs my-[5px]">
      <div className="flex space-x-2">
        <div className="animate-bounce bg-gray-500 rounded-full h-3 w-3"></div>
        <div className="animate-bounce bg-gray-500 rounded-full h-3 w-3 delay-100"></div>
        <div className="animate-bounce bg-gray-500 rounded-full h-3 w-3 delay-200"></div>
      </div>
    </div>
  );
};

export default Loader;
