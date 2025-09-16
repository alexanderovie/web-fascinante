import { faqData } from '@/data/faq';
import RevealAnimation from '../animation/RevealAnimation';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const Faq = () => {
  return (
    <section className="pt-14 pb-14 md:pt-16 md:pb-16 lg:pt-[88px] lg:pb-[88px] xl:pt-[100px] xl:pb-[100px]">
      <div className="main-container">
        <div className="mb-14 space-y-3 text-center md:mb-[70px]">
          <RevealAnimation delay={0.1}>
            <span className="badge badge-cyan mb-3.5 md:mb-5">FAQ</span>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <h2>Commonly asked questions</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <p className="mx-auto lg:max-w-[620px]">
              By offering concise and informative responses, this section helps users find solutions without the need to
              contact customer support, saving time
            </p>
          </RevealAnimation>
        </div>
      </div>
      <RevealAnimation delay={0.4}>
        <div>
            <Accordion
              type="single"
              className="mx-auto w-full max-w-[850px] space-y-4"
              defaultValue="1">
            {faqData.map((item) => (
              <AccordionItem
                className="bg-background-1 dark:bg-background-6 rounded-[20px] px-6 sm:px-8"
                key={item.id}
                value={item.id.toString()}>
                <AccordionTrigger className="flex w-full cursor-pointer items-center justify-between pt-5 pb-5 sm:pt-8 sm:pb-8">
                  <span className="flex-1 text-left sm:text-heading-6 text-tagline-1 font-normal text-secondary dark:text-accent">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </RevealAnimation>
    </section>
  );
};

Faq.displayName = 'Faq';
export default Faq;
