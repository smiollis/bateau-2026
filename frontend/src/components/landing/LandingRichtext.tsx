import AnimatedReveal from "@/components/ui/animated-reveal";

interface LandingRichtextProps {
  title: string;
  content: string;
}

const LandingRichtext = ({ title, content }: LandingRichtextProps) => {
  return (
    <section className="section-padding">
      <div className="container-custom max-w-3xl">
        <AnimatedReveal>
          <h2
            className="font-heading text-3xl md:text-4xl font-semibold mb-6 text-primary dark:text-blue-100"
          >
            {title}
          </h2>
        </AnimatedReveal>
        <AnimatedReveal>
          <div
            className="prose prose-lg max-w-none text-muted-foreground dark:prose-invert dark:prose-strong:text-blue-100 dark:prose-p:text-blue-200/70 dark:prose-li:text-blue-200/70"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </AnimatedReveal>
      </div>
    </section>
  );
};

export default LandingRichtext;
