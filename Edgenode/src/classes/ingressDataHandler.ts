import interfaceProcess  from './interfaceProcessDataString';

export default abstract class ingressDataHandler implements interfaceProcess { 

  protected _regex : string;

  abstract processDataString(dataString : string): boolean;
  /**
   * Extract based on string pattern
   */
  public getValue = (valueName,datastring) => {
    let regexString = valueName+this._regex;
    let regex = new RegExp(regexString,"g");
    let found = regex.exec(datastring);
    return found ? found[1] || null : null;
  }

}