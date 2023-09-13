import net from 'net';
import fs from 'fs';
import { sub } from '../flow';
import { pipeFile } from './client';

export const server = net.createServer(connection => {
  console.log('client connected.');
  connection.on('close', () => console.log('disconnected.'))
  connection.on('data', phase => {
    console.log(`update phase: ${phase.toString()}`);
    sub.emit(phase.toString());
  })
  connection.on('error', err => console.error(err.message));
});

try {
  fs.unlinkSync(pipeFile)
} catch (error) { }
