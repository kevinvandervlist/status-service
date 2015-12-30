export = function tsd(gulp:any, plugins:any):any {
  return plugins.shell.task([
    "tsd reinstall --clean",
    "tsd link",
    "tsd rebundle"
  ]);
};
