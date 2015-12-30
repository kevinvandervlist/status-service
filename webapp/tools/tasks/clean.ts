import * as async from "async";
import * as del from "del";
import {APP_DEST, TEST_DEST, TMP_DIR} from "../config";

export = function clean(gulp:any, plugins:any, option:any):Function {
  return function (done:any):void {

    switch(option) {
      case "all"    : cleanAll(done);     break;
      case "dist"   : cleanDist(done);    break;
      case "test"   : cleanTest(done);    break;
      case "tmp"    : cleanTmp(done);     break;
      default: done();
    }

  };
};

function cleanAll(done:any):void {
  async.parallel([
    cleanDist,
    cleanTest,
    cleanTmp
  ], done);
}
function cleanDist(done:any):void {
  del(APP_DEST, done);
}
function cleanTest(done:any):void {
  del(TEST_DEST, done);
}
function cleanTmp(done:any):void {
  del(TMP_DIR, done);
}
