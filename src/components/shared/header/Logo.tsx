import logo from '@public/images/shared/icono-fascinante.svg';
import mainLogo from '@public/images/shared/logo-fascinante.svg';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <span className="sr-only">Home</span>
        <figure className="hidden lg:block lg:max-w-[198px] p-[15px]">
          <Image src={mainLogo} alt="Fascinante Digital" className="dark:invert" />
        </figure>

        {/* mobile logo */}
        <figure className="block max-w-[44px] lg:hidden">
          <Image src={logo} alt="Fascinante Digital" className="w-full dark:invert" />
        </figure>
      </Link>
    </div>
  );
};

export default Logo;
