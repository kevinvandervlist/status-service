import * as runSequence from "run-sequence";
import {join} from "path";
import {APP_SRC} from "../config";
import {notifyLiveReload} from "../utils";

export = function watchServe(gulp:any, plugins:any):Function {
  return function ():void {
    plugins.watch(join(APP_SRC, "**"), (e:any) =>
      runSequence("build.dev", () => notifyLiveReload(e))
    );
  };
};
