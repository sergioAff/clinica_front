import Image from "next/image";

export const MultimediaItem = ({ link }: { link: string }) => {
  return (
    <Image
      src={`${link}`}
      alt={`${link}`}
      width={1000}
      height={1000}
      title={`${link}`}
      priority
      className="w-full relative h-auto object-cover max-w-full rounded-lg"
    ></Image>
  );
};
