import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { filter, takeUntil } from 'rxjs/operators';
import { IField } from '../../interfaces/IField';
import { IFieldConfig } from '../../interfaces/IFieldConfig';
import {DestroyComponent} from '../../../../../other/utils/destroy/destroy.component';

@Component({
    selector: 'form-file',
    templateUrl: 'form-file.component.html',
    styleUrls: ['./form-file.scss'],
})
export class FormFileComponent extends DestroyComponent implements OnInit, IField {
    fileDetails: string
    config: IFieldConfig;
    group: FormGroup;

    constructor(private _cdr: ChangeDetectorRef) {
        super()
    }

    ngOnInit(): void {
        this.control.valueChanges
            .pipe(
                filter((f) => !!f && !f.hasOwnProperty('newAttachment')
                    && !f.hasOwnProperty('willDelete')),
                takeUntil(this.destroy$))
            .subscribe(data => {
                const { file_name: fileName, size } = data;
                this.fileDetails = `${fileName} - ${(size / 1000).toFixed(2)}KB`;
                this.control.setValue(null, { emitEvent: false });
            })
    }

    clear() {
        this.fileDetails = null;
        this.control.setValue({ willDelete: true });
    }

    change(e: any) {
        const [file] = e.target.files;
        const { name: fileName, size } = file;
        this.fileDetails = `${fileName} - ${(size / 1000).toFixed(2)}KB`;
        this.control.setValue({ [this.config.name]: file, newAttachment: true });
        this.control.updateValueAndValidity();
    }

    get control() {
        return this.group.get(this.config.name)
    }

}
