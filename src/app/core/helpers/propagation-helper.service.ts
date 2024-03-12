import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class PropagationHelperService {
  propagateStyles(path: string) : HTMLLinkElement {
    let s = document.createElement("link");
    s.type = "rel/stylesheet";
    s.href = path;
    return s;
  }

  propagateJsScript(path: string) : HTMLScriptElement {
    let s = document.createElement("script");
    s.type = "text/javascript";
    s.src = path;
    return s;
  }
}
