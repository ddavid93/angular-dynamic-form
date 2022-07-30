import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IField } from '../../interfaces/IField';
import { IFieldConfig } from '../../interfaces/IFieldConfig';
import { FormHelperService } from '../../../../../../services/_system/form.helper.service';
import { SequenceService } from 'src/app/_core/services/_system/sequence.service';
import { DestroyComponent } from 'src/app/_core/components/other/utils/destroy/destroy.component';
import { takeUntil, finalize, switchMap, filter, catchError } from 'rxjs/operators';
import { HotToastService } from '@ngneat/hot-toast';
import { of } from 'rxjs';

@Component({
    selector: 'form-input',
    templateUrl: 'form-input.component.html',
    styleUrls: ['./form-input.scss'],
})
export class FormInputComponent extends DestroyComponent implements IField, AfterViewInit {

    config: IFieldConfig;
    group: FormGroup;
    class: string;
    type = 'password';

    constructor(public formService: FormHelperService,
        private _sequenceService: SequenceService<any>,
        private _cdr: ChangeDetectorRef,
        private _hotToast: HotToastService) {
        super();
    }

    ngAfterViewInit(): void {
        if (!!this.config.options?.sequenceModel)
            this.loadForm()
    }

    get showLabel() {
        return typeof this.config.options?.showLabel === 'undefined' || !!this.config.options?.showLabel;
    }

    togglePassword() {
        this.type = this.type === 'password' ? 'text' : 'password';
    }

    loadForm() {
        const field = this.group.get(this.config.name)
        this.group.get('id').valueChanges
            .pipe(
                filter(item => !item),
                switchMap(() => this._sequenceService.get(this.config.options?.sequenceModel)),
                catchError((err) => {
                    this._hotToast.error(err);
                    return of(undefined)
                }),
                finalize(() => this._cdr.detectChanges()),
                takeUntil(this.destroy$))
            .subscribe(res => field.setValue(!!res.rows.length ? `${res.rows[0].sequence + 1}` : '1'))
    }
}
