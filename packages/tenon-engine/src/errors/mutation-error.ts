
export class MutationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MutationError';
  }
}
