import Link from 'next/link';
import MobileMenuItem from './MobileMenuItem';

const AboutUsMenu = () => {
  return (
    <MobileMenuItem id="about" title="About Us" hasSubmenu={false}>
      <Link
        href="/about"
        className="text-tagline-1 text-secondary/60 dark:text-accent/60 block w-full py-3 text-left font-normal transition-all duration-200">
        About Us
      </Link>
    </MobileMenuItem>
  );
};

AboutUsMenu.displayName = 'AboutUsMenu';
export default AboutUsMenu;
