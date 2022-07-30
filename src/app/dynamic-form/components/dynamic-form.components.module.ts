import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import {LabelComponent} from './label/label.component';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    declarations: [
        HeaderComponent,
        LabelComponent],
    exports: [
        LabelComponent,
        HeaderComponent]
})
export class DynamicFormComponentsModule {
}
