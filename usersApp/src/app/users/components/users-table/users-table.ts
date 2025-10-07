import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { UsersService } from "../../services";
import { PanelModule } from "primeng/panel";
import { TableModule } from "primeng/table";
import { CheckboxModule } from "primeng/checkbox";
import { ButtonModule } from "primeng/button";
import { FormsModule } from "@angular/forms";
import { User } from "../../interfaces";
import { AddUserModal } from "../add-user-modal";
import { DialogService, DynamicDialogModule } from "primeng/dynamicdialog";
import { firstValueFrom } from "rxjs";

@Component({
	selector: "users-table",
	standalone: true,
	imports: [
		AsyncPipe,
		PanelModule,
		TableModule,
		CheckboxModule,
		ButtonModule,
		FormsModule,
		DynamicDialogModule,
	],
	providers: [DialogService],
	templateUrl: "./users-table.html",
	styleUrl: "./users-table.scss",
})
export class UsersTable {
	private readonly _usersService = inject(UsersService);
	private readonly _dialogService = inject(DialogService);
	public users$ = this._usersService.users$;
	public canAddUser$ = this._usersService.canAddUser$;

	public toggleActive(id: number): void {
		this._usersService.toggleActive(id);
	}

	public async openAddUser() {
		const users = await firstValueFrom(this.users$);
		const ref = this._dialogService.open(AddUserModal, {
			header: "Add New User",
			width: "40%",
			modal: true,
			data: {
				existingUsers: users,
			},
		});

		ref?.onClose.subscribe((user: User) => {
			if (user) {
				this._usersService.addUser(user);
			}
		});
	}
}
