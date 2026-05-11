import { STATES } from "./states";

/** All-India listings that list every state — excluded from per-state drill-down totals. */
export function isNationwideAllStatesJob(job) {
  return (
    job?.state === "All India" &&
    Array.isArray(job?.stateIds) &&
    job.stateIds.length >= STATES.length
  );
}

/**
 * Same rule as HomePage state filter: a job "belongs" to a state if it is not nationwide-all-states,
 * and either the job's `state` label matches that region or it is pinned to that state only in `stateIds`.
 */
export function jobMatchesStateFilter(job, stateId) {
  if (!stateId) return true;
  if (isNationwideAllStatesJob(job)) return false;
  const sn = STATES.find((s) => s.id === stateId)?.n || "";
  if (job.state === sn) return true;
  const ids = job.stateIds;
  return Boolean(Array.isArray(ids) && ids.length === 1 && ids[0] === stateId);
}

/** Vacancies attributed to `stateId` for map / strip (matches state-filtered lists when no extra filters). */
export function vacanciesForStateId(job, stateId) {
  return jobMatchesStateFilter(job, stateId) ? Number(job.vacancies) || 0 : 0;
}
