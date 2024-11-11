import clsx from "clsx";
import { MobileMenuButtonType } from "@/types/MobileButtonType";

export const MobileMenuButton: React.FC<MobileMenuButtonType> = ({
  toggleMenu,
  isOpen,
}) => {
  return (
    <button onClick={toggleMenu} className="relative z-40">
      <div
        className={clsx(
          "relative flex items-center justify-center rounded-full w-[40px] h-[40px] transform transition-all bg-gray-secondary duration-200 shadow-sm shadow-gray-primary",
          {
            "ring-0": !isOpen,
            "ring-4 ring-green-secondary ring-opacity-30": isOpen,
          }
        )}
      >
        <div
          className={clsx(
            "flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center",
            {
              "-rotate-[45deg]": isOpen,
            }
          )}
        >
          <div
            className={clsx(
              "bg-white h-[2px] rounded transform transition-all duration-300 origin-right delay-75",
              {
                "-rotate-90": isOpen,
                "w-1/2": isOpen,
                "translate-y-[1px]": isOpen,
              }
            )}
          ></div>
          <div
            className={clsx("bg-white h-[2px] ", { "mx-0.5": isOpen })}
          ></div>
          <div
            className={clsx(
              "bg-white h-[2px] rounded transform transition-all duration-300 origin-left delay-75",
              {
                "self-end": isOpen,
                "-rotate-90 ": isOpen,
                "w-1/2": isOpen,
                "translate-y-[-1px]": isOpen,
              }
            )}
          ></div>
        </div>
      </div>
    </button>
  );
};
