import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Uppy from '@uppy/core';
import { DashboardOptions } from '@uppy/dashboard';
import Spanish from '@uppy/locales/lib/es_ES'
import XHRUpload from '@uppy/xhr-upload';
import { UppyService } from 'src/app/_core/services/_system/uppy.service';
import { IField } from '../../interfaces/IField';
import { IFieldConfig } from '../../interfaces/IFieldConfig';

@Component({
    selector: 'form-uppy',
    template: `
        <uppy-dashboard [props]="props" [uppy]="uppy"></uppy-dashboard>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormUppyComponent implements IField, OnInit {

    config: IFieldConfig;
    group: FormGroup;
    uppy: Uppy;
    props: DashboardOptions;

    constructor(private _uppyService: UppyService) {
    }

    ngOnInit(): void {
        const xhr = this.config.uppy?.xhrOptions;
        this.props = Object.assign({
            showRemoveButtonAfterComplete: true,
            doneButtonHandler: null,
            showProgressDetails: true,
            height: 300,
            hideUploadButton: true,
        }, this.config.uppy?.props);
        this.uppy = new Uppy(Object.assign({ locale: Spanish }, this.config.uppy?.conf));
        this.uppy.addFile;
        if (xhr)
            this.uppy.use(XHRUpload, xhr);
        this.config.uppy?.events?.forEach(element =>
            this.uppy.on(element.event, (...arg) => element.subject.next(...arg)));
    }

    getFiles() {
        return this.uppy.getFiles();
    }

    patchFiles() {
        const value = this.group.get(this.config.name).value;
        if (!!value) {
            const file = this._uppyService.convertDocumentForFile(value);
            this.uppy.addFile(file);
        }

    }
}
