import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock framer-motion
const motionProxy = {
  h1: ({
    children,
    ...props
  }: React.PropsWithChildren<Record<string, unknown>>) => {
    const { initial, animate, exit, transition, whileInView, viewport, ...domProps } = props;
    return <h1 {...domProps}>{children}</h1>;
  },
  h2: ({
    children,
    ...props
  }: React.PropsWithChildren<Record<string, unknown>>) => {
    const { initial, animate, exit, transition, whileInView, viewport, ...domProps } = props;
    return <h2 {...domProps}>{children}</h2>;
  },
  p: ({
    children,
    ...props
  }: React.PropsWithChildren<Record<string, unknown>>) => {
    const { initial, animate, exit, transition, whileInView, viewport, ...domProps } = props;
    return <p {...domProps}>{children}</p>;
  },
  div: ({
    children,
    ...props
  }: React.PropsWithChildren<Record<string, unknown>>) => {
    const { initial, animate, exit, transition, whileInView, viewport, ...domProps } = props;
    return <div {...domProps}>{children}</div>;
  },
};
vi.mock("framer-motion", () => ({
  motion: motionProxy,
  m: motionProxy,
  useReducedMotion: () => false,
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

// Mock Link from next-intl navigation
vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock Button component
vi.mock("@/components/ui/button", () => ({
  Button: ({ children, asChild, ...props }: { children: React.ReactNode; asChild?: boolean; [key: string]: unknown }) => {
    if (asChild) {
      return <>{children}</>;
    }
    return <button {...props}>{children}</button>;
  },
}));

// Mock Accordion components
vi.mock("@/components/ui/accordion", () => ({
  Accordion: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <div data-testid="accordion">{children}</div>
  ),
  AccordionItem: ({ children, value, ...props }: React.PropsWithChildren<{ value: string; [key: string]: unknown }>) => (
    <div data-testid={`accordion-item-${value}`}>{children}</div>
  ),
  AccordionTrigger: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <button data-testid="accordion-trigger">{children}</button>
  ),
  AccordionContent: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <div data-testid="accordion-content">{children}</div>
  ),
}));

import LandingHero from "@/components/landing/LandingHero";
import LandingBenefits from "@/components/landing/LandingBenefits";
import LandingFAQ from "@/components/landing/LandingFAQ";

describe("LandingHero", () => {
  const heroProps = {
    title: "EVJF sur la Seine",
    subtitle: "Une experience inoubliable a bord du Senang",
    backgroundImage: "/images/test-hero.jpg",
    cta: { text: "Reserver maintenant", href: "/reservation?occasion=evjf" },
  };

  it("renders the title", () => {
    render(<LandingHero {...heroProps} />);
    expect(screen.getByText("EVJF sur la Seine")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<LandingHero {...heroProps} />);
    expect(screen.getByText("Une experience inoubliable a bord du Senang")).toBeInTheDocument();
  });

  it("renders the CTA button text", () => {
    render(<LandingHero {...heroProps} />);
    expect(screen.getByText("Reserver maintenant")).toBeInTheDocument();
  });

  it("CTA links to correct href", () => {
    render(<LandingHero {...heroProps} />);
    const link = screen.getByText("Reserver maintenant").closest("a");
    expect(link).toHaveAttribute("href", "/reservation?occasion=evjf");
  });

  it("renders the background image", () => {
    render(<LandingHero {...heroProps} />);
    const img = screen.getByAltText("EVJF sur la Seine");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/images/test-hero.jpg");
  });

  it("renders inside a section element", () => {
    const { container } = render(<LandingHero {...heroProps} />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });
});

describe("LandingBenefits", () => {
  const benefitsProps = {
    title: "Pourquoi nous choisir ?",
    items: [
      { icon: "ship", title: "Bateau prive", text: "Le Senang rien que pour vous." },
      { icon: "champagne", title: "Champagne offert", text: "Une coupe de champagne par personne." },
      { icon: "camera", title: "Decor de reve", text: "Vue imprenable sur les monuments." },
      { icon: "heart", title: "Sur mesure", text: "Personnalisez votre croisiere." },
    ],
  };

  it("renders the section title", () => {
    render(<LandingBenefits {...benefitsProps} />);
    expect(screen.getByText("Pourquoi nous choisir ?")).toBeInTheDocument();
  });

  it("renders all benefit items", () => {
    render(<LandingBenefits {...benefitsProps} />);
    expect(screen.getByText("Bateau prive")).toBeInTheDocument();
    expect(screen.getByText("Champagne offert")).toBeInTheDocument();
    expect(screen.getByText("Decor de reve")).toBeInTheDocument();
    expect(screen.getByText("Sur mesure")).toBeInTheDocument();
  });

  it("renders benefit descriptions", () => {
    render(<LandingBenefits {...benefitsProps} />);
    expect(screen.getByText("Le Senang rien que pour vous.")).toBeInTheDocument();
    expect(screen.getByText("Une coupe de champagne par personne.")).toBeInTheDocument();
  });

  it("renders 4 benefit cards", () => {
    render(<LandingBenefits {...benefitsProps} />);
    const titles = benefitsProps.items.map((item) => screen.getByText(item.title));
    expect(titles).toHaveLength(4);
  });

  it("renders inside a section element", () => {
    const { container } = render(<LandingBenefits {...benefitsProps} />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("handles unknown icon gracefully (falls back to Star)", () => {
    const propsWithUnknownIcon = {
      title: "Benefits",
      items: [{ icon: "unknown-icon", title: "Test Item", text: "Test text" }],
    };
    expect(() => render(<LandingBenefits {...propsWithUnknownIcon} />)).not.toThrow();
    expect(screen.getByText("Test Item")).toBeInTheDocument();
  });
});

describe("LandingFAQ", () => {
  const faqProps = {
    title: "Questions frequentes",
    items: [
      { question: "Quelle est la duree ?", answer: "La croisiere dure 2 heures." },
      { question: "Combien ca coute ?", answer: "A partir de 290 euros." },
      { question: "Peut-on apporter de la nourriture ?", answer: "Oui, vous pouvez amener votre traiteur." },
    ],
  };

  it("renders the FAQ title", () => {
    render(<LandingFAQ {...faqProps} />);
    expect(screen.getByText("Questions frequentes")).toBeInTheDocument();
  });

  it("renders all questions", () => {
    render(<LandingFAQ {...faqProps} />);
    expect(screen.getByText("Quelle est la duree ?")).toBeInTheDocument();
    expect(screen.getByText("Combien ca coute ?")).toBeInTheDocument();
    expect(screen.getByText("Peut-on apporter de la nourriture ?")).toBeInTheDocument();
  });

  it("renders all answers", () => {
    render(<LandingFAQ {...faqProps} />);
    expect(screen.getByText("La croisiere dure 2 heures.")).toBeInTheDocument();
    expect(screen.getByText("A partir de 290 euros.")).toBeInTheDocument();
    expect(screen.getByText("Oui, vous pouvez amener votre traiteur.")).toBeInTheDocument();
  });

  it("renders 3 accordion items", () => {
    render(<LandingFAQ {...faqProps} />);
    const triggers = screen.getAllByTestId("accordion-trigger");
    expect(triggers).toHaveLength(3);
  });

  it("renders the accordion container", () => {
    render(<LandingFAQ {...faqProps} />);
    expect(screen.getByTestId("accordion")).toBeInTheDocument();
  });

  it("renders inside a section element", () => {
    const { container } = render(<LandingFAQ {...faqProps} />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("handles empty FAQ list", () => {
    const emptyProps = { title: "FAQ", items: [] };
    expect(() => render(<LandingFAQ {...emptyProps} />)).not.toThrow();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
  });
});
