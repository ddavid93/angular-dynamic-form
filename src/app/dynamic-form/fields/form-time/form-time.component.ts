import { AfterViewInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { takeUntil, tap } from 'rxjs/operators';
import { FormHelperService } from '../../../../../../services/_system/form.helper.service';
import { IField } from '../../interfaces/IField';
import { IFieldConfig } from '../../interfaces/IFieldConfig';
import {DestroyComponent} from '../../../../../other/utils/destroy/destroy.component';

@Component({
    selector: 'form-time',
    templateUrl: 'form-time.component.html',
    styleUrls: ['./../form-datetime/form-datetime.scss']
})
export class FormTimeComponent extends DestroyComponent implements IField, AfterViewInit {

    config: IFieldConfig;
    group: FormGroup;
    toggleEnable: boolean
    min: Date
    max: Date

    constructor(public formService: FormHelperService) {
        super();
    }

    ngAfterViewInit(): void {
        this.control.valueChanges
            .pipe(
                takeUntil(this.destroy$),
                tap(() => this.toggleEnable = this.group.get(this.config.name).disabled))
            .subscribe(value => {
                if (typeof value === 'string') {
                    this.control.patchValue(moment(value, 'HH:mm').toDate(),
                        { onlySelf: true, emitEvent: false })
                }
            });
    }

    get control() {
        return this.group.get(this.config.name)
    }

    get value() {
        return moment(this.control.value).format('HH:mm')
    }
}
