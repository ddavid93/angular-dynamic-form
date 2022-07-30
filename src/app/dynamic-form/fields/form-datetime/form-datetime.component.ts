import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {defineLocale} from 'ngx-bootstrap/chronos';
import {BsDatepickerConfig, BsLocaleService} from 'ngx-bootstrap/datepicker';
import {esLocale} from 'ngx-bootstrap/locale';
import {map, startWith, takeUntil, tap} from 'rxjs/operators';
import {FormHelperService} from '../../../../../../services/_system/form.helper.service';
import {IField} from '../../interfaces/IField';
import {IFieldConfig} from '../../interfaces/IFieldConfig';
import {FormDynamicCheckboxComponent} from '../form-dynamic-checkbox/form-dynamic-checkbox.component';
import {FormTimeComponent} from '../form-time/form-time.component';
import {DestroyComponent} from '../../../../../other/utils/destroy/destroy.component';

defineLocale('es', esLocale);

@Component({
    selector: 'form-date-time',
    templateUrl: 'form-datetime.component.html',
    styleUrls: ['./form-datetime.scss']
})
export class FormDatetimeComponent extends DestroyComponent implements IField, OnInit, AfterViewInit {

    ready: boolean;
    config: IFieldConfig;
    configTime: IFieldConfig[] = [];
    iteration: IFieldConfig[] = [];
    group: FormGroup;
    dateConfig: Partial<BsDatepickerConfig>;
    dateEndConfig: Partial<BsDatepickerConfig>;
    isRange: boolean;
    isTime: boolean;
    isAllDay: boolean;
    endDateName = 'end_date';
    allDayConf = {
        type: FormDynamicCheckboxComponent,
        label: 'Todo el Día',
        name: 'is_full_day_event',
        class: 'col-12',
        options: {
            firstSvg: 'evaluation_calendar',
            secondSvg: 'evaluation_calendar',
        }
    };

    minutes = new Date().getMinutes();
    time = new Date().setMinutes(this.minutes < 30 && this.minutes >= 1 ? 0 : 30);

    constructor(public formService: FormHelperService,
                private _fb: FormBuilder,
                private _cdr: ChangeDetectorRef,
                private _localeService: BsLocaleService) {
        super();
        this._localeService.use('es');
    }

    ngOnInit(): void {
        const defaultDate = new Date(this.time);
        this.iteration[0] = this.config;
        this.isRange = !!this.config.options?.range;
        this.isTime = !!this.config.options?.time;
        const initialConf: Partial<BsDatepickerConfig> = {
            adaptivePosition: true,
            containerClass: 'theme-blue',
            customTodayClass: 'custom-today-class',
        };

        this.dateConfig = Object.assign(this.config.options?.dateConfig || {}, initialConf);
        if (!!this.isTime) {
            this.group.addControl('start_time', this._fb.control(defaultDate), {emitEvent: false});
            this.iteration[1] = {
                type: FormTimeComponent,
                name: 'start_time',
                class: this.config.class || 'col-2',
                value: !!this.config.options?.startTimeValue ? this.config.options?.startTimeValue : defaultDate,
                validation: [Validators.required]
            };
        }
        if (!!this.isRange) {
            if (!this.group.get(this.config.name)) {
                this.group.addControl(this.config.name, this._fb.control(defaultDate), {emitEvent: false});
            }
            this.dateEndConfig = Object.assign(this.dateConfig, this.config.options?.dateEndConfig || {});
            if (!this.config.class) {
                this.config.class = 'col-2';
            }
            if (!!this.config.options?.endDateName) {
                this.endDateName = this.config.options.endDateName;
            }
            let labels: string[] = !!this.config.placeholder ? this.config.placeholder.split(',')
                : ['Fecha Inicio', 'Fecha Fin'];
            if (this.config.options?.noLabels === true) {
                labels = [null, null];
            }
            const helperTexts: string[] = !!this.config.helperText ? this.config.helperText.split(',')
                : [null, null];
            this.config.label = labels[0];
            this.config.helperText = helperTexts[0];
            const disabled = this.config.disabled;
            const value = this.group.get(this.config.name).value;
            const {validation, asyncValidators, updateOn} = this.config;
            this.group.addControl(this.endDateName, this._fb.control({disabled, value}, {
                validators: validation,
                asyncValidators,
                updateOn
            }), {emitEvent: false});
            this.iteration[!!this.isTime ? 2 : 1] = {
                type: FormDatetimeComponent,
                name: this.endDateName,
                class: this.config.class,
                label: labels[1],
                helperText: helperTexts[1],
                options: {
                    endDate: true
                },
                validation: this.config.validation || []
            };
            if (!!this.isTime) {
                this.group.addControl('end_time', this._fb.control(moment(defaultDate).add(30, 'minutes').toDate()), {emitEvent: false});
                this.iteration[3] = {
                    type: FormTimeComponent,
                    name: 'end_time',
                    class: this.config.class || 'col-2',
                    value: !!this.config.options?.dateEndConfig?.endTimeValue ? this.config.options?.dateEndConfig?.endTimeValue : moment(defaultDate).add(30, 'minutes').toDate(),
                    validation: this.config.validation || []
                };
            }
        }
        if (this.config.options?.hasOwnProperty('allDay')) {
            this.isAllDay = true;
            this.group.addControl('is_full_day_event', this._fb.control(this.config.options.allDay), {emitEvent: false});
        }
        this.ready = true;
    }

    isTimeType(item: IFieldConfig) {
        return item.type === FormTimeComponent;
    }

    disableOrEnable(disable: boolean, justTime = false) {
        const condition = !!disable ? 'disable' : 'enable'
        this.startTimeControl[condition]()
        this.endTimeControl[condition]()
        if (!justTime) {
            this.startDateControl[condition]()
            this.endDateControl[condition]()
        }
        this._cdr.detectChanges()
    }

    private timeComponent(field: string): FormTimeComponent {
        return this.iteration.find(f => f.name === field)?.component.instance
    }

    private formTimeControl(field: string) {
        return this.timeComponent(field)?.control
    }

    get startTimeControl(): AbstractControl {
        return this.formTimeControl('start_time')
    }

    get endTimeControl() {
        return this.formTimeControl('end_time')
    }

    get startDateControl() {
        return this.group.get(this.config.name)
    }

    get endDateControl() {
        return this.group.get(this.endDateName)
    }

    ngAfterViewInit(): void {
        // Handle value changes.
        // Case: is an all day event.
        this.group.get('is_full_day_event')?.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => {
                this.startTimeControl[data ? 'disable' : 'enable']()
                if (!!this.isRange) {
                    this.endTimeControl[data ? 'disable' : 'enable']()
                }
            })

        if (!!this.isRange) {
            // Case: is a simple or range event.   
            this.startDateControl.valueChanges
                .pipe(
                    map((data) => moment(data).toDate()),
                    tap((data) => this.startDateControl.setValue(data, {emitEvent: false})),
                    takeUntil(this.destroy$))
                .subscribe(() => this.validateDate())

            this.startTimeControl?.valueChanges
                .pipe(
                    startWith({}), map(m => moment(m).toDate()),
                    takeUntil(this.destroy$))
                .subscribe(() => this.validateTimes());

            this.endDateControl?.valueChanges
                .pipe(
                    map((data) => moment(data).toDate()),
                    tap((data) => this.endDateControl.setValue(data, {emitEvent: false})),
                    takeUntil(this.destroy$))
                .subscribe(() => this.validateDate())

            this.endTimeControl?.valueChanges
                .pipe(
                    startWith({}), map(m => moment(m).toDate()),
                    takeUntil(this.destroy$))
                .subscribe(() => this.validateTimes());
        }
    }

    private validateDate() {
        this.iteration[!!this.isTime ? 2 : 1].options.min = moment(this.startDateControl.value, 'YYYY-MM-DD').toDate();
        this.iteration[0].options.max = new Date(this.endDateControl.value);
        this._cdr.detectChanges()
    }

    private validateTimes() {
        const startDate = moment(this.startDateControl.value, 'YYYY-MM-DD')
        const endDate = moment(this.endDateControl.value, 'YYYY-MM-DD')
        const startTime = moment(this.startTimeControl.value, 'HH:mm');
        const endTime = moment(this.endTimeControl.value, 'HH:mm');
        if (startDate.isSameOrAfter(endDate, 'day')) {
            if (startTime.isSameOrAfter(endTime, 'm'))
                this.endTimeControl.setValue(startTime.add(30, 'm').toDate(), {emitEvent: false})
            this.timeComponent('end_time').min = moment(this.startTimeControl.value).add(30, 'm').toDate()
            this.timeComponent('start_time').max = moment(this.endTimeControl.value).add(-30, 'm').toDate()
        } else {
            this.timeComponent('end_time').min = null
            this.timeComponent('start_time').max = null
        }
    }

}
