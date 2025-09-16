import ContactInfo from '@/components/contact-page/ContactInfo';
import ContactMap from '@/components/contact-page/ContactMap';
import CTAV1 from '@/components/shared/cta/CTAV1';
import FooterThree from '@/components/shared/footer/FooterThree';
import NavbarOne from '@/components/shared/header/NavbarOne';
import PageHero from '@/components/shared/PageHero';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Fascinante Digital',
  description: 'Contact Us Page - Fascinante Digital',
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

const ContactUs = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) => {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'es');

  return (
    <>
      <NavbarOne
        dict={dict}
        className="border border-stroke-2 bg-accent/60 dark:border-stroke-6 dark:bg-background-9 backdrop-blur-[25px]"
        btnClassName="btn-primary hover:btn-secondary dark:hover:btn-accent"
      />
      <main className="bg-background-3 dark:bg-background-7">
        <PageHero
          title={dict.navigation.contact}
          heading={dict.navigation.contact}
          link="/contact-us"
          className="pt-24 md:pt-36 lg:pt-40 xl:pt-[200px]"
        />
        <ContactInfo />
        <ContactMap />
        <CTAV1
          className="dark:bg-background-5 bg-white"
          badgeClass="badge-yellow-v2"
          badgeText={dict.cta.badge}
          ctaBtnText={dict.navigation.contact}
          ctaHeading={dict.navigation.contact}
          description="We're here to help you with your inquiries and needs. Feel free to reach out to us using the contact form below, and we'll get back to you as soon as possible."
        />
      </main>
      <FooterThree />
    </>
  );
};
ContactUs.displayName = 'ContactUs';
export default ContactUs;
