import { Service } from "./decorators";
import { WorkbenchDIService, WorkbenchDIServiceCore } from "./services";

@Service({ name: WorkbenchDIService })
class PreloadWorkbenchService {
  constructor() {
    return new WorkbenchDIServiceCore;
  }
};