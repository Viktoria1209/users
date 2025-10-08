import {
	AbstractControl,
	AsyncValidatorFn,
	ValidationErrors,
} from "@angular/forms";
import {
	distinctUntilChanged,
	map,
	Observable,
	of,
	switchMap,
	take,
	timer,
} from "rxjs";

export function asyncDuplicateNamesValidator(
	getNames: () => string[]
): AsyncValidatorFn {
	return (control: AbstractControl): Observable<ValidationErrors | null> => {
		return of(control.value).pipe(
			distinctUntilChanged(),
			switchMap(() => timer(500)),
			map(() => {
				const names = getNames().map((name) => name.trim().toLowerCase());
				const name = control.value?.trim().toLowerCase();
				return names.includes(name) ? { duplicateName: true } : null;
			}),
			take(1)
		);
	};
}

