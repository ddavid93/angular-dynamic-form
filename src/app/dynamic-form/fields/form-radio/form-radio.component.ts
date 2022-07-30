import {AfterViewInit, Component} from '@angular/core';
import {IField} from '../../interfaces/IField';
import {IFieldConfig} from '../../interfaces/IFieldConfig';
import {FormGroup} from '@angular/forms';
import {FormHelperService} from '../../../../../../services/_system/form.helper.service';

@Component({
    selector: 'app-form-radio',
    templateUrl: './form-radio.component.html'
})
export class FormRadioComponent implements IField, AfterViewInit {

    config: IFieldConfig;
    group: FormGroup;

    constructor(public formService: FormHelperService) {
    }

    ngAfterViewInit(): void {
        if (!this.config.options.checked) {
            return;
        }

        this.group.get(this.config.name).setValue(this.config.options.checked);
    }
}
