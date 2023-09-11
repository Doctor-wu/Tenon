export abstract class BaseMutation {
  abstract handle(): unknown;
  abstract reverse(): unknown;
}
