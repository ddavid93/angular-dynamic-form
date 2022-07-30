import {AfterViewInit, Component, OnInit} from '@angular/core';
import {IField} from '../../interfaces/IField';
import {IFieldConfig} from '../../interfaces/IFieldConfig';
import {FormBuilder, FormGroup} from '@angular/forms';
import {filter, takeUntil} from 'rxjs/operators';
import {DestroyComponent} from '../../../../../other/utils/destroy/destroy.component';

@Component({
    selector: 'app-form-filter-gender-checkbox',
    templateUrl: './form-filter-gender-checkbox.component.html',
    styleUrls: ['./form-filter-gender-checkbox.component.scss']
})
export class FormFilterGenderCheckboxComponent extends DestroyComponent implements IField, OnInit, AfterViewInit {

    config: IFieldConfig;
    group: FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        this.group.addControl('female', this.fb.control(null, this.config.validation));
        this.group.addControl('male', this.fb.control(null, this.config.validation));
    }

    ngAfterViewInit(): void {

        this.group.get('female').valueChanges
            .pipe(takeUntil(this.destroy$),
                filter(v => typeof v === 'boolean' && !!v))
            .subscribe(() => this.group.get('male').setValue(false, {emitEvent: false}))

        this.group.get('male').valueChanges
            .pipe(takeUntil(this.destroy$),
                filter(v => typeof v === 'boolean' && !!v))
            .subscribe(() => this.group.get('female').setValue(false, {emitEvent: false}))
    }

}
