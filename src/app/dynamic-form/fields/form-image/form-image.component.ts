import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IField } from '../../interfaces/IField';
import { IFieldConfig } from '../../interfaces/IFieldConfig';

@Component({
    selector: 'form-image',
    templateUrl: 'form-image.component.html',
    styleUrls: ['./form-image.scss']
})
export class FormImageComponent implements IField, OnInit {

    config: IFieldConfig;
    group: FormGroup;
    imageURL: string;
    showedPreview: boolean;

    constructor(private cdr: ChangeDetectorRef) {
    }

    get control() {
        return this.group.get(this.config.name);
    }

    ngOnInit(): void {
        if (!this.config.options?.default) {
            if (!this.config.options) {
                this.config.options = {};
            }
            this.config.options.default = './assets/media/users/blank.png';
        }
    }

    showPreview(event) {
        const file = (event.target as HTMLInputElement).files[0];
        if (!!file) {
            const reader = new FileReader();
            this.showedPreview = true;
            reader.onload = () => {
                this.imageURL = reader.result as string;
                this.cdr.detectChanges();
            };
            reader.readAsDataURL(file);
            this.control.patchValue({[this.config.name]: file, newImg: true});
            this.control.updateValueAndValidity();
        }
    }

    clear() {
        this.imageURL = this.config.options.default;
        this.control.setValue(null);
    }
}
