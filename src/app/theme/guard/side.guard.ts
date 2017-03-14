import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {BaRoutingService} from "../services";

@Injectable()
export class SideGuard implements CanActivate {

    constructor(private _routingService: BaRoutingService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> |  boolean {
         return this._routingService.getSides().map(
            (data) => {
                let sides = data.obj;
                let lock = true;
                for (let side of sides) {
                    if (side.name == route.url[0].path) {
                        return lock = side.lock;
                    }
                }
                return true;
            }
        );


    }
}