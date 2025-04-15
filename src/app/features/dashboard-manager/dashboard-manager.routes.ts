import {Routes} from '@angular/router';
import {DashboardManagerComponent} from './dashboard-manager.component';
import {RevenueComponent} from './pages/revenue/revenue.component';
import {MecanicienComponent} from './pages/mecanicien/mecanicien.component';
import {ServiceComponent} from './pages/service/service.component';
import {isAuthManager} from '../connect.guard';
import {RoleMecanicienComponent} from './pages/role-mecanicien/role-mecanicien.component';


export const dashboardManagerRoutes: Routes = [
    {
        path:"",
        component:DashboardManagerComponent,
        title:"Tableau de bord - Manager",
        children:[
            {
                path:"",
                component: RevenueComponent,
                pathMatch:"full"
            },
            {
                path:"mecanicien",
                component: MecanicienComponent
            },
            {
                path:"service",
                component: ServiceComponent
            },
            {
                path:"roleMecanicien",
                component: RoleMecanicienComponent
            }
        ],
        canActivate:[isAuthManager]
    },
]
