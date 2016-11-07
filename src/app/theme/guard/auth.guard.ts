import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private authService:AuthService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> |  boolean{
        return this.authService.isAuthenticated()
    }
}