import {Component, Input} from '@angular/core';
import {IFieldConfig} from '../../interfaces/IFieldConfig';
import {FormHelperService} from '../../../../../../services/_system/form.helper.service';

@Component({
    selector: 'app-label-form',
    templateUrl: './label.component.html'
})
export class LabelComponent {
    @Input() config: IFieldConfig;

    constructor(public formService: FormHelperService) {
    }
}
