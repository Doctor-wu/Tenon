import { BaseController } from "../../controller";

function useRouter(target, propertyKey: string | symbol, descriptor) {
  const cb = descriptor.value;

  target.handlers = target.handlers || [];
  target.handlers.push(
    (instance: BaseController) => {
      const { app } = instance;
      const { $router } = app;
      const { router } = $router!;
      router.use(cb);
    }
  );
}

export { useRouter };