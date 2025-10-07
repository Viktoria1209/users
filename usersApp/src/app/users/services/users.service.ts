import { Injectable } from "@angular/core";
import {
	addEntities,
	updateEntities,
	selectAllEntities,
} from "@ngneat/elf-entities";
import { usersStore } from "./users.store";
import { map } from "rxjs";
import { User } from "../interfaces/user.interface";

@Injectable({ providedIn: "root" })
export class UsersService {
	public users$ = usersStore.pipe(selectAllEntities());
	public canAddUser$ = this.users$.pipe(
		map((users) => users.every((user) => user.isActive) && users.length < 5)
	);

	constructor() {
		usersStore.update(
			addEntities([
				{ id: 1, name: "Alice", isActive: true },
				{ id: 2, name: "Bob", isActive: true },
				{ id: 3, name: "Katie", isActive: true },
			])
		);
	}

	public toggleActive(id: number): void {
		usersStore.update(
			updateEntities(id, (user) => ({ ...user, active: !user.isActive }))
		);
	}

	public addUser(user: User): void {
		usersStore.update(addEntities(user));
	}
}

