import { WorkbenchDIService, WorkbenchDIServiceCore } from "./core";
import { Service } from "./decorators";

@Service({ name: WorkbenchDIService })
class PreloadWorkbenchService {
  constructor() {
    return new WorkbenchDIServiceCore;
  }
};