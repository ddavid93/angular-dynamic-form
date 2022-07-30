import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {IFieldConfig} from '../../interfaces/IFieldConfig';
import {IField} from '../../interfaces/IField';
import {FormHelperService} from '../../../../../../services/_system/form.helper.service';

@Component({
    selector: 'form-checkbox',
    templateUrl: 'form-checkbox.component.html',
    styleUrls: ['./form-checkbox.scss'],
})
export class FormCheckboxComponent implements IField {
    config: IFieldConfig;
    group: FormGroup;
    class: string;

    constructor(public formService: FormHelperService) {
    }

    get showLabel() {
        return typeof this.config.options?.showLabel === 'undefined' || !!this.config.options?.showLabel;
    }
}
