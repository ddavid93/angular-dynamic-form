import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {IField} from '../../interfaces/IField';
import {IFieldConfig} from '../../interfaces/IFieldConfig';
import {FormHelperService} from '../../../../../../services/_system/form.helper.service';
import {Color, NgxMatColorPickerInput} from '@angular-material-components/color-picker';
import {map, takeUntil, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
    selector: 'form-color',
    templateUrl: 'form-color.component.html',
    styleUrls: ['./form-color.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FormColorComponent implements IField, OnInit, OnDestroy {

    @ViewChild(NgxMatColorPickerInput) pickerInput: NgxMatColorPickerInput;
    config: IFieldConfig;
    group: FormGroup;
    $destroy = new Subject<boolean>();

    constructor(public formService: FormHelperService, private cdr: ChangeDetectorRef) {
    }


    ngOnInit(): void {
        this.group.get(this.config.name).valueChanges
            .pipe(
                takeUntil(this.$destroy),
                map(i => this.hexToRgb(i)),
                tap(i => this.pickerInput.value = i))
            .subscribe(() => this.cdr.detectChanges());
    }

    hexToRgb(hex) {
        if (!!hex) {
            if (!(hex instanceof Object)) {
                const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
                const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                const resultRgb = result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : null;
                return resultRgb ? new Color(resultRgb.r, resultRgb.g, resultRgb.b) : null;
            }
            return hex;
        }
    }

    ngOnDestroy(): void {
        this.$destroy.next();
        this.$destroy.complete();
    }


}
