import Axios from 'axios';
const instance = Axios.create();

export const FlowName = {
  INSTALL: 'install',
  BUILD_MATERIALS: 'build-materials',
  LAUNCH_BFF: 'launch-bff',
  RUN_CMS: 'run-cms',
}

export const waitPhase = (phase: string, span = 1000): Promise<void> => {
  return new Promise((resolve) => {
    handleWait(phase, resolve, span);
  })
}

export const setPhase = (phase: string) => {
  instance.get(`http://localhost:4396/setPhase?phase=${phase}`);
}

function handleWait(phase, resolve, span) {
  setTimeout(() => {
    instance.get('http://localhost:4396/getPhase').then((res) => {
      if (res.data === phase) resolve();
      else handleWait(phase, resolve, span);
    });
  }, span);
}