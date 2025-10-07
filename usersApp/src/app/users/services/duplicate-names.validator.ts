import {
	AbstractControl,
	AsyncValidatorFn,
	ValidationErrors,
} from "@angular/forms";
import { map, Observable, timer } from "rxjs";

export function asyncDuplicateNamesValidator(
	getNames: () => string[]
): AsyncValidatorFn {
	return (control: AbstractControl): Observable<ValidationErrors | null> => {
		return timer(500).pipe(
			map(() => {
				const names = getNames().map((name) => name.trim().toLowerCase());
				const name = control.value?.trim().toLowerCase();
				return names.includes(name) ? { duplicateName: true } : null;
			})
		);
	};
}

