import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  let router = inject(Router);
  let toastr = inject(ToastrService);

  const token = localStorage.getItem('token')!=null;
  const role:any = localStorage.getItem('role')

  if(token){
    //console.log(role)
    if (route.data && route.data['roles']) {
      const allowedRoles = route.data['roles'] as string[];
      //console.log(allowedRoles)
      if (allowedRoles.includes(role)) {
        return true;
      } else {
        toastr.warning("You don't have permission to access this page.");
        router.navigateByUrl('/dashboard');
        return false;
      }
    } else {
      return true;
    }
  } else {
    router.navigateByUrl('/');
    toastr.warning('Please Login First to Handle the services!');
    return false;
  }
};
