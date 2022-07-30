import {FormGroup} from '@angular/forms';
import {IFieldConfig} from './IFieldConfig';

export interface Field {
    config: IFieldConfig,
    group: FormGroup
}
