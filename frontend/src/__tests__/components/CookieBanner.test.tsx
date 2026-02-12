import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock dependencies
const mockAcceptAll = vi.fn();
const mockOpenModal = vi.fn();
const mockCloseModal = vi.fn();
const mockRejectAll = vi.fn();
const mockUpdateConsent = vi.fn();

let mockShowBanner = true;
let mockShowModal = false;

vi.mock("@/hooks/useCookieConsent", () => ({
  useCookieConsent: () => ({
    showBanner: mockShowBanner,
    showModal: mockShowModal,
    acceptAll: mockAcceptAll,
    openModal: mockOpenModal,
    closeModal: mockCloseModal,
    consent: { necessary: true, analytics: false, marketing: false },
    rejectAll: mockRejectAll,
    updateConsent: mockUpdateConsent,
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
      const {
        initial,
        animate,
        exit,
        transition,
        whileInView,
        viewport,
        ...domProps
      } = props;
      return <div {...domProps}>{children}</div>;
    },
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

// Mock Link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mock CookieModal
vi.mock("@/components/CookieModal", () => ({
  default: ({ open }: { open: boolean }) =>
    open ? <div data-testid="cookie-modal">Modal</div> : null,
}));

import CookieBanner from "@/components/CookieBanner";

describe("CookieBanner", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockShowBanner = true;
    mockShowModal = false;
  });

  it("shows banner when showBanner is true", () => {
    render(<CookieBanner />);
    expect(screen.getByText("bannerText")).toBeInTheDocument();
    expect(screen.getByText("acceptAll")).toBeInTheDocument();
    expect(screen.getByText("customize")).toBeInTheDocument();
  });

  it("calls acceptAll when clicking accept button", async () => {
    const user = userEvent.setup();
    render(<CookieBanner />);
    await user.click(screen.getByText("acceptAll"));
    expect(mockAcceptAll).toHaveBeenCalledOnce();
  });

  it("calls openModal when clicking customize", async () => {
    const user = userEvent.setup();
    render(<CookieBanner />);
    await user.click(screen.getByText("customize"));
    expect(mockOpenModal).toHaveBeenCalledOnce();
  });

  it("does not show banner when showBanner is false", () => {
    mockShowBanner = false;
    render(<CookieBanner />);
    expect(screen.queryByText("bannerText")).not.toBeInTheDocument();
  });

  it("shows modal when showModal is true", () => {
    mockShowModal = true;
    render(<CookieBanner />);
    expect(screen.getByTestId("cookie-modal")).toBeInTheDocument();
  });
});
