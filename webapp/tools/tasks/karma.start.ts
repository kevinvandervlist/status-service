import * as karma from "karma";
import {join} from "path";

export = function karmaStart():Function {
  return function (done:any):void {
    new (<any>karma).Server({
      configFile: join(process.cwd(), "karma.conf.js"),
      singleRun: true
    }).start(done);
  };
};
