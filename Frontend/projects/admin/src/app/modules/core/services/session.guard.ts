import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
	providedIn: 'root',
})
export class SessionGuard implements CanActivate {
	constructor(private session: SessionService) {}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.session.authorized;
	}
}
