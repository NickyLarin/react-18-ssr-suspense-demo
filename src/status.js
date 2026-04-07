export function updateStatus(phase) {
  const statusNode = document.getElementById("client-status-text");
  const statusCard = document.getElementById("client-status");

  if (!statusNode || !statusCard) {
    return;
  }

  const messages = {
    booting: "Hydration started. The client Suspense subtree is now waiting on its promise.",
    waiting: "The client component is still hydrating and suspended on its promise.",
    resolved: "The client promise resolved. React can now finish hydrating the Suspense subtree."
  };

  statusCard.dataset.phase = phase;
  statusNode.textContent = messages[phase] ?? messages.booting;
}
