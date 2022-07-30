import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IField} from '../../interfaces/IField';
import {IFieldConfig} from '../../interfaces/IFieldConfig';
import {FormHelperService} from '../../../../../../services/_system/form.helper.service';
import {ConfirmedValidator} from '../../../../../../validators/confirm-password.validator';

@Component({
    selector: 'form-password',
    templateUrl: 'form-password.component.html',
    styleUrls: ['./form-password.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FormPasswordComponent implements OnInit, IField {
    config: IFieldConfig;
    group: FormGroup;
    class: string;
    passwordStrength: number;
    showPassword = false;
    showConfirmPassword = false;

    constructor(public formService: FormHelperService, private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.group.addControl('confirmPassword', this.fb.control(null, this.config.validation));
        this.group.setValidators(ConfirmedValidator('password', 'confirmPassword'));
    }

    isInvalid(field) {
        return (this.formService.isControlInvalid(this.group, field) && this.passwordStrength < 100);
    }

    isValid(field) {
        return (this.formService.isControlValid(this.group, field) && this.passwordStrength === 100);
    }

    togglePassword() {
        this.showPassword = !this.showPassword;
    }

    toggleConfirmPassword() {
        this.showConfirmPassword = !this.showConfirmPassword;
    }
}
