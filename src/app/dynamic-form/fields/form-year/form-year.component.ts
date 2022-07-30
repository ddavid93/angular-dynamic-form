import {AfterViewInit, Component} from '@angular/core';
import {IField} from '../../interfaces/IField';
import {IFieldConfig} from '../../interfaces/IFieldConfig';
import {FormGroup} from '@angular/forms';
import {FormHelperService} from '../../../../../../services/_system/form.helper.service';
import * as moment from 'moment';
import {Moment} from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MatDatepicker} from '@angular/material/datepicker';
import {DATE_FORMATS_YEAR} from '../../../../../../const/dateFormat';

@Component({
    selector: 'app-form-year',
    templateUrl: './form-year.component.html',
    styleUrls: ['./form-year.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
        {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS_YEAR},
    ],
})
export class FormYearComponent implements IField, AfterViewInit {

    config: IFieldConfig;
    group: FormGroup;

    constructor(public formService: FormHelperService) {
    }

    get controlDate() {
        return this.group.get(this.config.name);
    }

    chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
        const ctrlValue = this.controlDate.value;
        ctrlValue.year(normalizedYear.year());
        this.controlDate.setValue(ctrlValue);
        datepicker.close();
    }

    ngAfterViewInit(): void {
        let value = this.config?.value;
        if (!value) {
            value = moment();
        } else if (!(value instanceof moment)) {
            value = moment();
        }

        this.controlDate.setValue(value);
    }

}
