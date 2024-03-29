export abstract class BaseMutation {
  abstract handle(): unknown;
  abstract reverse(): BaseMutation;
  abstract dispose(): void;
}
