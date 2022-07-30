import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {IFieldConfig} from '../../interfaces/IFieldConfig';
import {IField} from '../../interfaces/IField';

@Component({
    selector: 'form-dynamic-checkbox',
    templateUrl: 'form-dynamic-checkbox.component.html',
    styleUrls: ['./form-dynamic-checkbox.scss'],
})
export class FormDynamicCheckboxComponent implements IField {
    config: IFieldConfig;
    group: FormGroup;
    class: string;
}
