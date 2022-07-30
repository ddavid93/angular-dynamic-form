import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormHelperService } from '../../../../services/_system/form.helper.service';
import { FormInputComponent } from './fields/form-input/form-input.component';
import { IFieldConfig } from './interfaces/IFieldConfig';

@Component({
    exportAs: 'dynamicForm',
    selector: 'dynamic-form',
    templateUrl: 'dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {

    @Input() config: IFieldConfig[] = [];
    @Input() title: string;
    @Input() notAppendTitle: boolean;
    @Input() canGoBack = true;
    @Input() onlyFields = false;
    @Input() saveButton = true;
    /*
    TODO
    This Input must to be optimized for a better behavior in future,
    because it's repetitive the validation for only fields or not
    */
    @Input() tempOnlyThisField = false;
    @Output() save: EventEmitter<any> = new EventEmitter<any>();
    @Input() form: FormGroup;
    isLoading: boolean = false;

    constructor(
        private _fb: FormBuilder,
        public formService: FormHelperService,
        private _cdr: ChangeDetectorRef,
        private _route: ActivatedRoute) {
    }

    get value() {
        return this.form.value;
    }

    get control() {
        return this.form.controls;
    }

    get invalid() {
        return this.form.invalid;
    }

    ngOnInit() {
        const id = +this._route.snapshot.params.id;
        this.title = (!this.notAppendTitle ? (!!id ? 'Editar ' : 'Crear ') : '') + this.title;
        this.form = this.form || this.createGroup();
    }

    createGroup() {
        const group = this._fb.group({});
        this.config.sort((a, b) => (a.order - b.order))
            .forEach(ctrl => group.addControl(ctrl.name, this.formService.createControl(ctrl)));
        const id = {
            type: FormInputComponent,
            label: 'id',
            name: 'id',
            fieldType: 'hidden',
            class: 'col-lg-8'
        };
        group.addControl('id', this.formService.createControl(id));
        return group;
    }

    handleSubmit(event: Event) {
        if (!!this.formService.checkValidation(event, this.form))
            this.save.emit(this.value);
    }

    patchValues(data: any, options?: { onlySelf?: boolean; emitEvent?: boolean; }) {
        this.form.patchValue(data, options);
        this._cdr.detectChanges();
    }

    markAllAsTouched() {
        this.form.markAllAsTouched();
    }

    getControl(control) {
        return this.form.get(control);
    }

    setValue(name: string, value: any) {
        this.form.controls[name].setValue(value, { emitEvent: true });
    }
}
