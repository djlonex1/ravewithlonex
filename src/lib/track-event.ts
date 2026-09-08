export type AnalyticsAction =
  | "page_view"
  | "ticket_click"
  | "whatsapp_share"
  | "calendar_add";

export async function trackEvent(
  eventId: string,
  action: AnalyticsAction
) {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId,
        action,
      }),
      keepalive: true,
    });
  } catch {
    // Analytics should never interrupt the visitor experience.
  }
}
