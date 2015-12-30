import * as slash from "slash";
import {join} from "path";
import {APP_BASE, APP_DEST, ENV} from "../config";

let injectables: string[] = [];

export function injectableAssetsRef():string[] {
  return injectables;
}

export function registerInjectableAssetsRef(paths: string[], target: string = ""):void {
  injectables = injectables.concat(
    paths
      .filter((path:any) => !/(\.map)$/.test(path))
      .map((path:any) => join(target, slash(path).split("/").pop()))
  );
}

export function transformPath(plugins:any, env:any):Function {
  return function (filepath:any):any {
    filepath = ENV === "prod" ? filepath.replace(`/${APP_DEST}`, "") : filepath;
    arguments[0] = join(APP_BASE, filepath);
    return slash(plugins.inject.transform.apply(plugins.inject.transform, arguments));
  };
}
