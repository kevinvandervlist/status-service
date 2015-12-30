import {parallel} from "async";
import {join} from "path";
import * as Builder from "systemjs-builder";
import {BUNDLES_DEST, SYSTEM_CONFIG_BUILDER} from "../config";

const BUNDLE_OPTS = {
  minify: true,
  sourceMaps: true,
  format: "cjs"
};

export = function bundles(gulp:any, plugins:any):Function {
  return function (done:any):void {
    let builder = new Builder(SYSTEM_CONFIG_BUILDER);

    parallel([
      bundleApp
    ], () => done());

    function bundleApp(done:any):void {
      builder.bundle(
        "bootstrap - angular2/*",
        join(BUNDLES_DEST, "app.js"), BUNDLE_OPTS).then(done);
    }
  };
};
