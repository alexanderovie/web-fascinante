import BlogContent from '@/components/blod-details/BlogContent';
import CTAV1 from '@/components/shared/cta/CTAV1';
import FooterThree from '@/components/shared/footer/FooterThree';
import NavbarOne from '@/components/shared/header/NavbarOne';
import PageHero from '@/components/shared/PageHero';
// Removed unused imports
import { Metadata } from 'next';

// Dynamic route - no static generation for now

export const metadata: Metadata = {
  title: 'Blog Details - Fascinante Digital',
};

const BlogDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  // For now, return a placeholder - we'll implement proper blog loading later
  const blogContent = {
    title: 'Blog Post',
    content: 'This is a placeholder blog post.',
    slug: slug
  };

  return (
    <>
      <NavbarOne
        className="border border-stroke-2 bg-accent/60 dark:border-stroke-6 dark:bg-background-9 backdrop-blur-[25px]"
        btnClassName="btn-primary hover:btn-secondary dark:hover:btn-accent"
      />
      <main className="bg-background-3 dark:bg-background-7">
        <PageHero title="Our Blog" heading="Blog" />
        <BlogContent blog={blogContent} />
        <CTAV1
          className="dark:bg-background-7 bg-white"
          badgeClass="!badge-yellow-v2"
          badgeText="Get started"
          ctaHeading="Build a complete website using the assistance"
          description="Start your free trial today and see your ideas come to life easily and creatively."
          ctaBtnText="Get started"
        />
      </main>
      <FooterThree />
    </>
  );
};

export default BlogDetails;
