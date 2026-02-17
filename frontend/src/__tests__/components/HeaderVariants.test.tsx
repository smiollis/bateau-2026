import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockPush = vi.fn();
const mockReplace = vi.fn();
const mockSetVariant = vi.fn();

let mockVariant = "classic";

vi.mock("@/contexts/ThemeVariantContext", () => ({
  useThemeVariant: () => ({
    variant: mockVariant,
    setVariant: mockSetVariant,
    isDark: mockVariant === "nuit",
  }),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "fr",
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
    ul: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, exit, transition, whileInView, viewport, ...domProps } = props;
      return <ul {...domProps}>{children}</ul>;
    },
  };
  return {
    motion: proxy,
    m: proxy,
    AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
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
  useRouter: () => ({ push: mockPush, replace: mockReplace }),
  usePathname: () => "/",
}));

import HeaderVariants from "@/components/HeaderVariants";

describe("HeaderVariants", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockVariant = "classic";
  });

  it("renders logo and navigation items", () => {
    render(<HeaderVariants />);
    expect(screen.getByAltText("Un Bateau à Paris")).toBeInTheDocument();
    expect(screen.getAllByText("croisiere").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("bateau").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("tarifs").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("actualites").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("contact").length).toBeGreaterThanOrEqual(1);
  });

  it("renders reservation CTA button", () => {
    render(<HeaderVariants />);
    expect(screen.getAllByText("reservation").length).toBeGreaterThanOrEqual(1);
  });

  it("renders language switch showing current locale", () => {
    render(<HeaderVariants />);
    expect(screen.getAllByText("FR").length).toBeGreaterThanOrEqual(1);
  });

  it("toggles mobile menu on hamburger click", async () => {
    const user = userEvent.setup();
    render(<HeaderVariants />);
    const menuButton = screen.getByLabelText("toggleMenu");
    await user.click(menuButton);
    // Mobile nav items should be visible (duplicated in mobile menu)
    const cruiseButtons = screen.getAllByText("croisiere");
    expect(cruiseButtons.length).toBeGreaterThanOrEqual(2);
  });

  it("toggles theme between classic and nuit", async () => {
    const user = userEvent.setup();
    render(<HeaderVariants />);
    const themeBtn = screen.getByLabelText("nightMode");
    await user.click(themeBtn);
    expect(mockSetVariant).toHaveBeenCalledWith("nuit");
  });

  it("applies nuit variant styles", () => {
    mockVariant = "nuit";
    render(<HeaderVariants />);
    const themeBtn = screen.getByLabelText("dayMode");
    expect(themeBtn).toBeInTheDocument();
  });

  it("navigates to reservation on CTA click", async () => {
    const user = userEvent.setup();
    render(<HeaderVariants />);
    const ctaButtons = screen.getAllByText("reservation");
    expect(ctaButtons[0]).toBeDefined();
    await user.click(ctaButtons[0]!);
    expect(mockPush).toHaveBeenCalledWith("/reservation");
  });
});
