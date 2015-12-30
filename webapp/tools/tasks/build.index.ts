import {join, sep} from "path";
import {APP_SRC, APP_DEST, DEPENDENCIES, ENV} from "../config";
import {transformPath, templateLocals} from "../utils";

export = function buildIndexDev(gulp:any, plugins:any):Function {
  return function ():void {
    return gulp.src(join(APP_SRC, "index.html"))
      // NOTE: There might be a way to pipe in loop.
      .pipe(inject("shims"))
      .pipe(inject("libs"))
      .pipe(inject())
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(APP_DEST));
  };


  function inject(name?: string):any {
    return plugins.inject(gulp.src(getInjectablesDependenciesRef(name), { read: false }), {
      name,
      transform: transformPath(plugins, "dev")
    });
  }

  function getInjectablesDependenciesRef(name?: string):any {
    return DEPENDENCIES
      .filter((dep:any) => dep.inject && dep.inject === (name || true))
      .map(mapPath);
  }

  function mapPath(dep:any):any {
    let prodPath = join(dep.dest, dep.src.split(sep).pop());
    return ("prod" === ENV ? prodPath : dep.src );
  }
};
