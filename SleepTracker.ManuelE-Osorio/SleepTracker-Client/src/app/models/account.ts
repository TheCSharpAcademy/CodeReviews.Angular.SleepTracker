import { FormControl } from "@angular/forms";

export interface AccountDto{
    email: string;
    isEmailConfirmed: boolean;
}

export interface Account{
    email: string;
    password: string;
}

export interface AccountForm{
    email: FormControl<string>,
    password: FormControl<string>
}