import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockOpenModal = vi.fn();

vi.mock("@/contexts/ThemeVariantContext", () => ({
  useThemeVariant: () => ({
    variant: "classic",
    isDark: false,
  }),
}));

vi.mock("@/hooks/useCookieConsent", () => ({
  useCookieConsent: () => ({
    openModal: mockOpenModal,
  }),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    if (key === "copyright" && values?.year) return `© ${values.year}`;
    return key;
  },
}));

const motionProxy = {
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

vi.mock("@/i18n/navigation", () => ({
  Link: ({
    children,
    href,
    onClick,
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: React.MouseEventHandler;
  }) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  ),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/",
}));

import FooterVariants from "@/components/FooterVariants";

describe("FooterVariants", () => {
  it("renders brand name and description", () => {
    render(<FooterVariants />);
    expect(screen.getByText("brandName")).toBeInTheDocument();
    expect(screen.getByText("description")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<FooterVariants />);
    expect(screen.getByText("bateau")).toBeInTheDocument();
    expect(screen.getByText("croisiere")).toBeInTheDocument();
    expect(screen.getByText("tarifs")).toBeInTheDocument();
    expect(screen.getByText("galerie")).toBeInTheDocument();
    expect(screen.getByText("actualites")).toBeInTheDocument();
  });

  it("renders contact information", () => {
    render(<FooterVariants />);
    expect(screen.getByText("contactTitle")).toBeInTheDocument();
    expect(screen.getByText("+33 6 70 34 25 43")).toBeInTheDocument();
    expect(screen.getByText("capitaine@bateau-a-paris.fr")).toBeInTheDocument();
  });

  it("renders social media links", () => {
    render(<FooterVariants />);
    expect(screen.getByLabelText("instagramLabel")).toHaveAttribute(
      "href",
      "https://www.instagram.com/bateau_a_paris/"
    );
    expect(screen.getByLabelText("facebookLabel")).toHaveAttribute(
      "href",
      expect.stringContaining("facebook.com")
    );
  });

  it("renders legal links", () => {
    render(<FooterVariants />);
    expect(screen.getByText("mentionsLegales")).toBeInTheDocument();
    expect(screen.getByText("cgv")).toBeInTheDocument();
    expect(screen.getByText("confidentialite")).toBeInTheDocument();
    expect(screen.getByText("faq")).toBeInTheDocument();
  });

  it("opens cookie settings on click", async () => {
    const user = userEvent.setup();
    render(<FooterVariants />);
    await user.click(screen.getByText("cookieSettings"));
    expect(mockOpenModal).toHaveBeenCalledOnce();
  });

  it("renders copyright with current year", () => {
    render(<FooterVariants />);
    expect(
      screen.getByText(`© ${new Date().getFullYear()}`)
    ).toBeInTheDocument();
  });
});
