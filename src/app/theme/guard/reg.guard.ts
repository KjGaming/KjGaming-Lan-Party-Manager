import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaAuthService } from "../services";

@Injectable()
export class RegGuard implements CanActivate{

    constructor(private authService:BaAuthService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> |  boolean{
        return this.authService.successfullLogIn()
    }
}