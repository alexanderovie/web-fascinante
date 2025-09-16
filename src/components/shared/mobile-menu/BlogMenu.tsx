import Link from 'next/link';
import MobileMenuItem from './MobileMenuItem';

const BlogMenu = () => {
  return (
    <MobileMenuItem id="blog" title="Blog" hasSubmenu={false}>
      <Link
        href="/blog"
        className="text-tagline-1 text-secondary/60 dark:text-accent/60 border-stroke-4 dark:border-stroke-6 block w-full border-b py-3 text-left font-normal transition-all duration-200">
        Blog
      </Link>
    </MobileMenuItem>
  );
};

export default BlogMenu;
