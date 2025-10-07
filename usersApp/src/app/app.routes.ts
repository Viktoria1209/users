import { Routes } from "@angular/router";
import { UsersTable } from "./users";

export const routes: Routes = [
	{ path: "table", component: UsersTable },
	{ path: "", redirectTo: "table", pathMatch: "full" },
];
