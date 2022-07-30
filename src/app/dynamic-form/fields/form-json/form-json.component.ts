import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {IField} from '../../interfaces/IField';
import {IFieldConfig} from '../../interfaces/IFieldConfig';
import {FormHelperService} from '../../../../../../services/_system/form.helper.service';

@Component({
    selector: 'form-json',
    templateUrl: 'form-json.component.html',
    styleUrls: ['./form-json.scss'],
})
export class FormJsonComponent implements IField {
    config: IFieldConfig;
    group: FormGroup;
    class: string;
    text = './assets/media/svg/icons/Design/Pixels.svg';
    json = './assets/media/svg/icons/Design/Color.svg';
    textarea = false;

    constructor(public formService: FormHelperService) {
    }
}
