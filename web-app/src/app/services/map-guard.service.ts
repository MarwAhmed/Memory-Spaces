import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanDeactivate } from '@angular/router'; // Import CanDeactivate
import { Observable } from 'rxjs';
import { MarkerDataService } from './marker-data.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MapActivateGuard implements CanActivate {
    constructor(
        private markerDataService: MarkerDataService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.markerDataService.getPlacesData().pipe(map((placesData: any[]) => {
            if (placesData && placesData.length > 0) {
                return true; // Allow activation if places data is available
            } else {
                // Redirect to a different route if places data is not available
                return this.router.parseUrl('/error'); // Redirect to an error page
            }
        }));
    }
}

@Injectable({
    providedIn: 'root'
})
export class MapDeactivateGuard implements CanDeactivate<any> {
    constructor() {}

    canDeactivate(
        component: any,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // Implement deactivation logic if needed
        return true;
    }
}
