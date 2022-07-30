import {FormGroup} from '@angular/forms';
import {IFieldConfig} from './IFieldConfig';

export interface IField {
    config: IFieldConfig,
    group: FormGroup
}
