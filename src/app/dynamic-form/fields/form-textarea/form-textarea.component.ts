import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {IField} from '../../interfaces/IField';
import {IFieldConfig} from '../../interfaces/IFieldConfig';
import {FormHelperService} from '../../../../../../services/_system/form.helper.service';

@Component({
    selector: 'form-textarea',
    templateUrl: 'form-textarea.component.html',
    styleUrls: ['./form-textarea.scss']
})
export class FormTextareaComponent implements IField {
    config: IFieldConfig;
    group: FormGroup;
    class: string;

    constructor(public formService: FormHelperService) {
    }
}
