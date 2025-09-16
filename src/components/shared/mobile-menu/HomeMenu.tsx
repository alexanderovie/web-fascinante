import Link from 'next/link';
import MobileMenuItem from './MobileMenuItem';

const HomeMenu = () => {
  return (
    <MobileMenuItem id="home" title="Home" hasSubmenu={false}>
      <Link
        href="/"
        className="text-tagline-1 text-secondary/60 dark:text-accent/60 border-stroke-4 dark:border-stroke-6 block w-full border-b py-3 text-left font-normal transition-all duration-200">
        Home
      </Link>
    </MobileMenuItem>
  );
};

HomeMenu.displayName = 'HomeMenu';

export default HomeMenu;
