let clientPhase = "server";

export function reportClientPhase(phase) {
  if (typeof window === "undefined" || clientPhase === phase) {
    return;
  }

  clientPhase = phase;
  window.dispatchEvent(
    new CustomEvent("suspense-status", {
      detail: { phase }
    })
  );
}
