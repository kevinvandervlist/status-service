import {join} from "path";
import {APP_SRC} from "../config";

export = function watchTest(gulp:any, plugins:any):Function {
  return function ():void {
    plugins.watch(join(APP_SRC, "**/*.ts"), () => gulp.start("build.test"));
  };
};
