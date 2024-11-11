import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export const ModalLogin = ({ text }: { text: string }) => {
  return (
    <>
      {/* Mobile */}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 md:hidden ">
        <div className="relative bg-gray-200 w-full h-full flex flex-col items-center justify-center p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-xl text-center flex items-center justify-center">
            {text}
            <ExclamationCircleIcon className="h-7 mx-2 text-red-500 inline-block" />
          </h3>
        </div>
      </div>
      {/* Desktop */}
      <div className="fixed inset-0 md:flex hidden items-start justify-center bg-black bg-opacity-80 z-50">
        <div className="relative bg-gray-200 w-[80vw] flex flex-col items-center justify-center  max-w-md mt-[20dvh] h-auto p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-xl text-center h-full w-full">
            {text}{" "}
            <ExclamationCircleIcon className=" h-7 mx-2 text-red-500 text-center inline-block" />
          </h3>
        </div>
      </div>
    </>
  );
};
