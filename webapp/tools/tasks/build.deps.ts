import * as merge from "merge-stream";
import {DEPENDENCIES} from "../config";

export = function buildDepsProd(gulp:any, plugins:any):Function {
  return function ():any {
    let stream = merge();

    DEPENDENCIES.forEach((dep:any) => {
      stream.add(addStream(dep));
    });

    return stream;

    function addStream(dep:any):any {
      let stream = gulp.src(dep.src);
      stream.pipe(gulp.dest(dep.dest));
      return stream;
    }
  };
};
