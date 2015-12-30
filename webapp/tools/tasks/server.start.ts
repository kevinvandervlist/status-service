import {serveSPA} from "../utils";

export = function serverStart(gulp:any, plugins:any):Function {
  return function ():void {
    serveSPA();
  };
};
