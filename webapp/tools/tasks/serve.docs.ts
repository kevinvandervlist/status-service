import {serveDocs} from "../utils";

export = function serverStart(gulp:any, plugins:any):any {
  return function ():void {
    serveDocs();
  };
};
