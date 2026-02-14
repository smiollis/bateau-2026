import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock dependencies
const mockToast = vi.fn();
vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: mockToast }),
}));

vi.mock("@/contexts/ThemeVariantContext", () => ({
  useThemeVariant: () => ({ isDark: false, variant: "classic" }),
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
      const { initial, whileInView, viewport, transition, ...domProps } = props;
      return <div {...domProps}>{children}</div>;
    },
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  useReducedMotion: () => false,
}));

import ContactForm from "@/components/ContactForm";

describe("ContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it("renders all form fields", () => {
    render(<ContactForm />);
    expect(screen.getByPlaceholderText("namePlaceholder")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("emailPlaceholder")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("phonePlaceholder")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("messagePlaceholder"),
    ).toBeInTheDocument();
  });

  it("has a hidden honeypot field", () => {
    render(<ContactForm />);
    const honeypot = document.querySelector('input[name="website"]');
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveAttribute("aria-hidden", "true");
    expect(honeypot).toHaveAttribute("tabindex", "-1");
  });

  it("shows error toast when submitting empty form", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    const submitBtn = screen.getByRole("button", { name: /send/i });
    await user.click(submitBtn);
    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({ variant: "destructive" }),
    );
  });

  it("calls API and shows success toast on valid submit", async () => {
    const user = userEvent.setup();
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ContactForm />);
    await user.type(screen.getByPlaceholderText("namePlaceholder"), "Jean");
    await user.type(
      screen.getByPlaceholderText("emailPlaceholder"),
      "jean@test.fr",
    );
    await user.type(
      screen.getByPlaceholderText("messagePlaceholder"),
      "Bonjour",
    );

    const submitBtn = screen.getByRole("button", { name: /send/i });
    await user.click(submitBtn);

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" }),
    );
    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({ title: "successTitle" }),
    );
  });

  it("shows error toast on API failure", async () => {
    const user = userEvent.setup();
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "server_error" }),
    });

    render(<ContactForm />);
    await user.type(screen.getByPlaceholderText("namePlaceholder"), "Jean");
    await user.type(
      screen.getByPlaceholderText("emailPlaceholder"),
      "jean@test.fr",
    );
    await user.type(
      screen.getByPlaceholderText("messagePlaceholder"),
      "Bonjour",
    );

    const submitBtn = screen.getByRole("button", { name: /send/i });
    await user.click(submitBtn);

    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({ variant: "destructive" }),
    );
  });
});
