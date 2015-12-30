import {join} from "path";
import {APP_SRC} from "../config";

export = function buildSassDev(gulp:any, plugins:any, option:any):Function {
  return function ():void {
    return gulp.src(join(APP_SRC, "**", "*.scss"))
      .pipe(plugins.sass().on("error", plugins.sass.logError))
      .pipe(gulp.dest(APP_SRC));
  };
}
