import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";

import { asyncDuplicateNamesValidator } from "../../services/duplicate-names.validator";
import { User } from "../../interfaces";
import { InputText } from "primeng/inputtext";

@Component({
	selector: "add-user-modal",
	standalone: true,
	imports: [CheckboxModule, ReactiveFormsModule, ButtonModule, InputText],
	templateUrl: "./add-user-modal.html",
	styleUrl: "./add-user-modal.scss",
})
export class AddUserModal implements OnInit {
	private readonly _fb = inject(FormBuilder);
	private readonly _dialogRef = inject(DynamicDialogRef);
	private readonly _dialogConfig = inject(DynamicDialogConfig);
	private existingUsers!: User[];
	public addUserForm = this._fb.group({
		name: [
			"",
			{
				validators: [Validators.required],
				asyncValidators: [
					asyncDuplicateNamesValidator(() =>
						this.existingUsers.map((user) => user.name)
					),
				],
				// updateOn: "blur" <=== one more option to trigger async validator fewer times
			},
		],
		isActive: [false],
	});

	ngOnInit(): void {
		this.existingUsers = this._dialogConfig.data.existingUsers;
	}

	public onSubmit() {
		if (this.addUserForm.valid) {
			const formValue = this.addUserForm.value;
			const maxId = this.existingUsers.length
				? Math.max(...this.existingUsers.map((user) => user.id))
				: 0;
			const newId = maxId + 1; //clutch for unique id generation

			const newUser = {
				id: newId,
				...formValue,
			};

			this._dialogRef.close(newUser);
		}
	}

	public closeDialog() {
		this._dialogRef.close();
	}
}
