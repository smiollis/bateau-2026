"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", padding: "2rem", textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            Une erreur est survenue
          </h2>
          <p style={{ color: "#6b7280", maxWidth: "28rem" }}>
            Une erreur inattendue s&apos;est produite. Veuillez réessayer ou revenir à la page d&apos;accueil.
          </p>
          <button
            onClick={reset}
            style={{ padding: "0.75rem 1.5rem", backgroundColor: "#1e3a5f", color: "white", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontSize: "1rem" }}
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}
