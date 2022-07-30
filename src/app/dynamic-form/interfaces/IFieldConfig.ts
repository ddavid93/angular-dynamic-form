import { ComponentRef, Type } from '@angular/core';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { IField } from './IField';
import { IFieldCheckboxInterface } from './IFieldCheckboxInterface';
import { IFieldContractAmount } from './IFieldContractAmount';
import { IFieldNgSelectInterface } from './IFieldNgSelect';
import { IFieldSelectInterface } from './IFieldSelectInterface';
import { IUppy } from './IUppy';

/**
 * Interface for Dynamic Forms.
 *
 * `type:` Type of html field, is required.
 *
 * `name:` Name of the field, this name will be the `FormControlName`, is required.
 *
 * `class:` This class apply to the div (just for size), contenting the formGroup, example: `col-lg-4`.
 *
 * `label:` Label of the component
 *
 * `order:` This param is for ordering the fields if needed.
 *
 *  `fieldType:` Default is `text`, this is for example `<input type="fieldType">`.
 *
 *  `placeholder:` Placeholder if necessary.
 *
 *  `required:` Default is false, this is used for * on the labels.
 *
 *  `validation:` Array of ValidatorFn.
 *
 *  `options:` Object with other options, this give the posibility to add other functionalities.
 *             Example of use: in the municipality component can be enable dpa with:
 *             `options: {dpa: true}`.
 *
 *  `range:` This is only used for `datetime` type. It accept a boolean, if true then enable other
 *           datetime input with "Fecha Fin", if not, then only render the one declared on config.
 *
 *  `disabled:` Disabled or not if we want the component be render like that.
 *
 *  `value:` We can pass a value by default.
 *
 *  `select:` Only using if type is "select", check the `IFieldSelectInterface` for params comments.
 *
 *  `ngSelect:` Only using if type is "ngSelect", check the `IFieldSelectInterface` for params comments.
 * 
 *  `contractAmountConfig:` Only using if type is "contract-amount", add option to show ContracAmount actions.
 *
 *  `checkbox:` Only using if type is "checkbox", check the `IFieldCheckboxInterface` for params comments.
 *
 *  `asyncValidators:` It accepts an AsyncValidatorFn or AsyncValidatorFn[] for async validator in reactive forms.
 */

export interface IFieldConfig {
    type: Type<IField>;
    name: string;
    class: string;
    component?: ComponentRef<any>;
    order?: number;
    style?: string,
    label?: string;
    fieldType?: string;
    placeholder?: string;
    staticText?: string;
    helperText?: string;
    required?: boolean;
    validation?: ValidatorFn[];
    options?: any;
    // options?: Options<typeof this['type']>;
    time?: boolean;
    range?: boolean;
    disabled?: boolean,
    value?: any,
    uppy?: IUppy,
    select?: IFieldSelectInterface;
    checkbox?: IFieldCheckboxInterface;
    ngSelect?: IFieldNgSelectInterface;
    contractAmountConfig?: IFieldContractAmount;
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
    /**
     * @description
     * The event name for control to update upon.
     */
    updateOn?: 'change' | 'blur' | 'submit';
}

// type Options<T extends Type<IField>> = T extends FormDatetimeComponent ? DateTime :
//     T extends FormDynamicCheckboxComponent ? DynamicCheckbox :
//     never

// type DynamicCheckbox = {
//     firstSvg: string,
//     secondSvg: string,
// }

// type DateTime = {
//     range: boolean,
//     time: boolean,
//     allDay: boolean,
//     min?: Date,
//     max?: Date
// }