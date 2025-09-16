import Features from '@/components/our-services-01/Features';
import Pricing from '@/components/our-services-01/Pricing';
import Services from '@/components/our-services-01/Services';
import Solutions from '@/components/our-services-01/Solutions';
import CTAV1 from '@/components/shared/cta/CTAV1';
import FooterOne from '@/components/shared/footer/FooterOne';
import NavbarOne from '@/components/shared/header/NavbarOne';
import PageHero from '@/components/shared/PageHero';
import { getDictionary } from '../dictionaries';
import { Metadata } from 'next';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: 'Our Services 01 - Fascinante Digital',
};

const OurServices01 = async ({
  params,
}: {
  params: Promise<{ lang: 'en' | 'es' }>;
}) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <Fragment>
      <NavbarOne
        className="bg-accent/60 border border-stroke-2 dark:border-stroke-6 dark:bg-background-9 backdrop-blur-[25px]"
        btnClassName="btn-primary hover:bg-secondary dark:hover:btn-accent"
        megaMenuColor="!bg-background-3 dark:!bg-background-7"
        dict={dict}
      />
      <main className="bg-background-1 dark:bg-background-6">
        <PageHero title={dict.services.title} heading={dict.services.title} link="/our-services" />
        <Services />
        <Features />
        <Solutions />
        <Pricing />
        <CTAV1
          className="dark:bg-background-6 bg-white"
          badgeClass="hidden"
          ctaHeading={dict.cta.title}
          spanText="assistance"
          description={dict.cta.description}
          btnClass="hover:btn-secondary dark:hover:btn-accent"
          ctaBtnText={dict.cta.button}
        />
      </main>
      <FooterOne />
    </Fragment>
  );
};

export default OurServices01;
