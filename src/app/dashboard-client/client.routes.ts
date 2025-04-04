import { Routes } from "@angular/router";
import { VoituresComponent } from "./voitures/voitures.component";
import { isAuthClient } from "../features/connect.guard";

export const clientRoutes:Routes = [
  {
    path:"",
    redirectTo:"voitures",
    pathMatch:"full"
  },
  {
    path:"voitures",
    component: VoituresComponent,
    canActivate: [isAuthClient]
  }
];
