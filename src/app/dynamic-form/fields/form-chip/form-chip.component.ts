import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {IField} from '../../interfaces/IField';
import {IFieldConfig} from '../../interfaces/IFieldConfig';

/**
 * @title Chips Autocomplete
 */
@Component({
    selector: 'form-chip',
    templateUrl: 'form-chip.component.html',
    styleUrls: ['./../form-input/form-input.scss']
})
export class FormChipComponent implements IField {

    config: IFieldConfig;
    group: FormGroup;

    get control() {
        return this.group.get(this.config.name);
    }

    add(event: MatChipInputEvent): void {
        if (!this.control.value) {
            this.control.setValue([]);
        }
        if (event.value) {
            this.control.value.push((event.value || '').trim());
            event.input.value = '';
            this.control.updateValueAndValidity();
        }
    }

    remove(index: string): void {
        this.control.value.splice(index, 1);
        this.control.updateValueAndValidity();
    }

}
