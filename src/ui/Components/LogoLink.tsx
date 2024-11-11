import Link from "next/link";
import Image from "next/image";

export function LogoLink() {
  return (
    <div className=" w-40">
      <Link href="/">
        <Image
          src="/Logo/logo.png"
          alt="Logo"
          title="Logo de la empresa"
          width={0}
          height={0}
          layout="responsive"
        />
      </Link>
    </div>
  );
}
