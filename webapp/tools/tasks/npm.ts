export = function npm(gulp:any, plugins:any):Function {
  return plugins.shell.task([
    "npm prune"
  ]);
};
