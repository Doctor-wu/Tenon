import { Subscribe } from "@tenon/shared";
export const sub = new Subscribe;

export const PhaseName = {
  INSTALL: 'install',
  BUILD_MATERIALS: 'build-materials',
  LAUNCH_BFF: 'launch-bff',
  RUN_CMS: 'run-cms',
}

export const waitPhase = (phase: string): Promise<void> => {
  return new Promise((resolve) => {
    sub.once(phase, resolve);
  })
}

export const setPhase = (client, phase: string) => {
  client.write(Buffer.from(phase));
}
