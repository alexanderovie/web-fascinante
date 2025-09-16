import faqData from '@/data/json/faq/faq.json';
import RevealAnimation from '../animation/RevealAnimation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const FaqAccordion = () => {
  return (
    <RevealAnimation delay={0.3}>
      <div>
          <Accordion
            type="single"
            className="mx-auto w-full max-w-[576px] lg:mx-0"
            defaultValue="1">
          {faqData.map((item) => (
            <AccordionItem
              className="dark:bg-background-6 rounded-[20px] bg-white"
              key={item.id}
              value={item.id.toString()}>
              <AccordionTrigger className="flex w-full cursor-pointer items-center justify-between pt-6 pb-6">
                <span className="flex-1 text-left !text-heading-6 font-normal text-secondary dark:text-accent">
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </RevealAnimation>
  );
};

export default FaqAccordion;
