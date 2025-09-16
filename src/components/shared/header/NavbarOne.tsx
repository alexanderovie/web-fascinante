'use client';

// Header v1
import { MobileMenuProvider } from '@/context/MobileMenuContext';
import { getNavigationItems } from '@/utils/getNavigationItems';
import { Dictionary } from '@/types/dictionary';

// Default dictionary fallback
const defaultDict: Dictionary = {
  navigation: {
    home: 'Home',
    pages: 'Pages',
    about: 'About',
    services: 'Services',
    blog: 'Blog',
    contact: 'Contact Us',
    getStarted: 'Get started'
  },
  hero: {
    title: 'Leading companies around the globe rely on nexSaas',
    description: 'Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text.'
  },
  blog: {
    title: 'Our Blog',
    heading: 'Blog'
  },
  cta: {
    badge: 'Get started',
    title: 'Build a complete website using the assistance',
    description: 'Start your free trial today and see your ideas come to life easily and creatively.',
    button: 'Get started',
    placeholder: 'Enter your email',
    noCreditCard: 'No credit card required',
    freeTrial: '14-Day free trial'
  },
  services: {
    title: 'Our Services'
  },
  footer: {
    description: 'Turpis tortor nunc sed amet et faucibus vitae morbi congue sed id mauris.',
    company: 'Company',
    aboutUs: 'About Us',
    career: 'Career',
    caseStudies: 'Case Studies',
    contactUs: 'Contact Us',
    support: 'Support',
    faq: 'FAQ',
    documentation: 'Documentation',
    tutorial: 'Tutorial',
    legalPolicies: 'Legal Policies',
    termsConditions: 'Terms & Conditions',
    privacyPolicy: 'Privacy Policy',
    refundPolicy: 'Refund Policy',
    gdprCompliance: 'GDPR Compliance',
    affiliatePolicy: 'Affiliate Policy',
    copyright: 'Copyright ©Fascinante Digital – smart application for modern business'
  }
};
import { useNavbarScroll } from '@/hooks/useScrollHeader';
import { cn } from '@/utils/cn';
import { FC } from 'react';
import MobileMenu from '../MobileMenu';
import PageMegaMenu from '../mega-menu/PageMegaMenu';
import Logo from './Logo';
import MobileMenuButton from './MobileMenuButton';
import NavCTAButton from './NavCTAButton';
import NavItemLink from './NavItemLink';

interface NavbarOneProps {
  className?: string;
  megaMenuColor?: string;
  btnClassName?: string;
  dict?: Dictionary;
}

const NavbarOne: FC<NavbarOneProps> = ({ className, megaMenuColor, btnClassName, dict }) => {
  const { isScrolled } = useNavbarScroll(100);

  return (
    <MobileMenuProvider>
      <header>
        <div
          className={cn(
            'lp:!max-w-[1290px] fixed top-5 left-1/2 z-50 mx-auto flex w-full max-w-[320px] -translate-x-1/2 items-center justify-between rounded-full px-2.5 py-2.5 transition-all duration-500 ease-in-out min-[425px]:max-w-[375px] min-[500px]:max-w-[450px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] xl:py-0',
            isScrolled && 'top-2 transition-all duration-500 ease-in-out',
            className,
          )}>
          {/* logo */}
          <Logo />
          {/* navigation */}
          <nav className="hidden items-center xl:flex">
            <ul className="flex items-center">
              {getNavigationItems(dict || defaultDict).map((item) => {
                const renderMegaMenu = () => {
                  switch (item?.megaMenuComponent) {
                    case 'PageMegaMenu':
                      return <PageMegaMenu className={megaMenuColor} />;
                    default:
                      return null;
                  }
                };

                // mega menu render
                return (
                  <li key={item?.id} className={cn('py-2.5', item?.hasDropdown && 'group/nav relative cursor-pointer')}>
                    <NavItemLink item={item} />
                    {item.hasDropdown && renderMegaMenu()}
                  </li>
                );
              })}
            </ul>
          </nav>
          <NavCTAButton href="/signup-01" btnClassName={btnClassName} label={(dict as unknown as { navigation?: { getStarted?: string } })?.navigation?.getStarted || "Get started"} />
          {/* mobile menu btn */}
          <MobileMenuButton />
        </div>
        <MobileMenu />
      </header>
    </MobileMenuProvider>
  );
};

NavbarOne.displayName = 'NavbarOne';
export default NavbarOne;
