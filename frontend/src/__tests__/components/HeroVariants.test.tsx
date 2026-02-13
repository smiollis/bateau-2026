import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

let mockIsDark = false;

vi.mock("@/contexts/ThemeVariantContext", () => ({
  useThemeVariant: () => ({
    variant: mockIsDark ? "nuit" : "classic",
    isDark: mockIsDark,
  }),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, exit, transition, whileInView, viewport, ...domProps } = props;
      return <div {...domProps}>{children}</div>;
    },
  },
}));

vi.mock("@/components/HeroCinemaSlideshow", () => ({
  default: () => <div data-testid="slideshow" />,
}));

vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

import HeroVariants from "@/components/HeroVariants";

describe("HeroVariants", () => {
  it("renders badge, title, subtitle and CTA", () => {
    render(<HeroVariants />);
    expect(screen.getByText("badge")).toBeInTheDocument();
    expect(screen.getByText("title1")).toBeInTheDocument();
    expect(screen.getByText("title2")).toBeInTheDocument();
    expect(screen.getByText("subtitle")).toBeInTheDocument();
    expect(screen.getByText("cta")).toBeInTheDocument();
  });

  it("renders slideshow component", () => {
    render(<HeroVariants />);
    expect(screen.getByTestId("slideshow")).toBeInTheDocument();
  });

  it("renders price information", () => {
    render(<HeroVariants />);
    expect(screen.getByText("priceFrom")).toBeInTheDocument();
    expect(screen.getByText("price")).toBeInTheDocument();
  });

  it("CTA links to reservation page", () => {
    render(<HeroVariants />);
    const ctaLink = screen.getByText("cta").closest("a");
    expect(ctaLink).toHaveAttribute("href", "/reservation");
  });

  it("renders in dark mode without errors", () => {
    mockIsDark = true;
    render(<HeroVariants />);
    expect(screen.getByText("title1")).toBeInTheDocument();
    mockIsDark = false;
  });
});
