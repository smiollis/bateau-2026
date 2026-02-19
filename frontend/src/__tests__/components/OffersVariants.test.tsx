import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/contexts/ThemeVariantContext", () => ({
  useThemeVariant: () => ({
    variant: "classic",
    isDark: false,
  }),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    if (key === "extraPerson" && values?.price) return `+${values.price}€/pers`;
    return key;
  },
}));

vi.mock("framer-motion", () => {
  const proxy = {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, exit, transition, whileInView, viewport, ...domProps } = props;
      return <div {...domProps}>{children}</div>;
    },
  };
  return {
    motion: proxy,
    m: proxy,
    useReducedMotion: () => false,
  };
});

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

import OffersVariants from "@/components/OffersVariants";

describe("OffersVariants", () => {
  it("renders section title and subtitle", () => {
    render(<OffersVariants />);
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("subtitle")).toBeInTheDocument();
  });

  it("renders all 4 offers", () => {
    render(<OffersVariants />);
    expect(screen.getByText("offer1Title")).toBeInTheDocument();
    expect(screen.getByText("offer2Title")).toBeInTheDocument();
    expect(screen.getByText("offer3Title")).toBeInTheDocument();
    expect(screen.getByText("offer4Title")).toBeInTheDocument();
  });

  it("renders prices for each offer", () => {
    render(<OffersVariants />);
    expect(screen.getByText("480€")).toBeInTheDocument();
    expect(screen.getByText("540€")).toBeInTheDocument();
    expect(screen.getAllByText("660€")).toHaveLength(2);
  });

  it("shows popular badge on second offer", () => {
    render(<OffersVariants />);
    expect(screen.getByText("popular")).toBeInTheDocument();
  });

  it("renders CTA buttons linking to reservation (3 reserve + 1 on demand)", () => {
    render(<OffersVariants />);
    const ctaLinks = screen.getAllByText("cta");
    expect(ctaLinks).toHaveLength(3);
    ctaLinks.forEach((link) => {
      expect(link.closest("a")).toHaveAttribute("href", "/reservation");
    });
    const onDemandLink = screen.getByText("ctaOnDemand");
    expect(onDemandLink.closest("a")).toHaveAttribute("href", "/#contact");
  });

  it("renders features for each offer", () => {
    render(<OffersVariants />);
    const featureItems = screen.getAllByText("feature_2h");
    expect(featureItems).toHaveLength(4);
  });

  it("renders JSON-LD structured data", () => {
    const { container } = render(<OffersVariants />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
    const data = JSON.parse(script!.textContent!);
    expect(data["@type"]).toBe("ItemList");
    expect(data.itemListElement).toHaveLength(4);
  });
});
