import net from 'net';

export const pipeFile = process.platform === 'win32' ? '\\\\.\\pipe\\tenonPip' : '/tmp/unix.sock';

export const createClient = () => net.connect(pipeFile);