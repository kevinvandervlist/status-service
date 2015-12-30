import {join} from "path";
import {APP_SRC} from "../config";

export = function watchDev(gulp:any, plugins:any):Function {
  return function ():void {
    plugins.watch(join(APP_SRC, "**/*"), () => gulp.start("build.dev"));
  };
};
