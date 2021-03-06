import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {BaAuthService, BaRoutingService} from "../services";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: BaAuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> |  boolean {
        return this.authService.isAuthenticated();
    }
}