const validStatuses = new Set(["operational", "degraded", "maintenance", "outage"]);

// Remote status data is normalized at the boundary before any UI trusts or displays it.
export function normalizeServices(payload) {
  if (!payload || !Array.isArray(payload.services)) throw new Error("Response must contain a services array.");
  if (payload.services.length === 0 || payload.services.length > 100) {
    throw new Error("Services must contain between 1 and 100 entries.");
  }

  const seenIds = new Set();
  return payload.services.map((service) => {
    const id = typeof service?.id === "string" ? service.id.trim() : "";
    const name = typeof service?.name === "string" ? service.name.trim() : "";
    if (!id || !name || !validStatuses.has(service?.status)) {
      throw new Error("A service entry is missing a valid id, name, or status.");
    }
    if (seenIds.has(id)) throw new Error(`Duplicate service id: ${id}.`);
    seenIds.add(id);

    const latencyMs = service.latencyMs == null ? null : service.latencyMs;
    if (latencyMs !== null && (!Number.isFinite(latencyMs) || latencyMs < 0)) {
      throw new Error(`Service ${id} has an invalid latencyMs value.`);
    }
    if (service.note != null && typeof service.note !== "string") {
      throw new Error(`Service ${id} has an invalid note value.`);
    }

    return {
      id,
      name,
      status: service.status,
      latencyMs,
      note: service.note?.trim() || "",
    };
  });
}
