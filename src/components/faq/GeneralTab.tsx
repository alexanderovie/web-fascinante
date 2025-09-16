import faqData from '@/data/json/faq/faq.json';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const GeneralTab = () => {
  return (
    <Accordion
      type="single"
      className="mx-auto w-full max-w-[850px] space-y-4"
      defaultValue="1">
      {faqData.map((item) => (
        <AccordionItem
          className="dark:bg-background-7 rounded-[20px] bg-white px-6 sm:px-8"
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
  );
};

export default GeneralTab;
