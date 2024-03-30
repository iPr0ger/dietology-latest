import {Injectable} from "@angular/core";
import {co} from "@fullcalendar/core/internal-common";

@Injectable({providedIn: "root"})
export class LoadScriptHelperService {
  constructor() {
  }

  loadJsScript(url: string) {
    let exist = false;
    document.getElementsByTagName('body')[0].childNodes.forEach((value) => {
      // @ts-ignore
      if (value.src !== undefined && value.src.includes(url)) {
        exist = true;
      }
    });
    if (!exist) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      document.getElementsByTagName('body')[0].appendChild(script);
    }
  }
}
