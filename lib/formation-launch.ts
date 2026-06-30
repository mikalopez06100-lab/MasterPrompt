const DEFAULT_LAUNCH_ISO = "2026-07-01T06:00:00+02:00";

export function getFormationLaunchTimestamp(): number {
  const raw =
    process.env.NEXT_PUBLIC_FORMATION_LAUNCH_ISO?.trim() || DEFAULT_LAUNCH_ISO;
  const t = Date.parse(raw);
  return Number.isFinite(t) ? t : new Date(DEFAULT_LAUNCH_ISO).getTime();
}

/** Formation ouverte — plus de phase précommande. */
export function isFormationLaunched(_now = Date.now()): boolean {
  return true;
}

export function getFormationLaunchLabel(): string {
  return "";
}

export function msUntilFormationLaunch(_now = Date.now()): number {
  return 0;
}
