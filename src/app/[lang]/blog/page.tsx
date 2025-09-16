import BlogListWrapper from '@/components/blog-03/BlogListWrapper';
import CTAV1 from '@/components/shared/cta/CTAV1';
import FooterThree from '@/components/shared/footer/FooterThree';
import NavbarOne from '@/components/shared/header/NavbarOne';
import PageHero from '@/components/shared/PageHero';
import { getDictionary } from '../dictionaries';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Fascinante Digital',
};

const BlogPage = async ({
  params,
}: {
  params: Promise<{ lang: 'en' | 'es' }>;
}) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <>
      <NavbarOne
        className="border border-stroke-2 bg-accent/60 dark:border-stroke-6 dark:bg-background-9 backdrop-blur-[25px]"
        btnClassName="btn-primary hover:btn-secondary dark:hover:btn-accent"
        dict={dict}
      />
      <main className="bg-background-3 dark:bg-background-5">
        <PageHero title={dict.blog.title} heading={dict.blog.heading} link="#" />
        <BlogListWrapper />
        <CTAV1
          className="dark:bg-background-7 bg-white"
          badgeClass="!badge-yellow-v2"
          badgeText={dict.cta.badge}
          ctaHeading={dict.cta.title}
          description={dict.cta.description}
          ctaBtnText={dict.cta.button}
        />
      </main>
      <FooterThree />
    </>
  );
};

export default BlogPage;
