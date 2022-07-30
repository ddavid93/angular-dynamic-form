import { Type } from '@angular/core';
import { IBaseService } from '../../../../../interfaces/IBaseService';
import { SimpleService } from '../../../../../services/_system/simple.service';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { IFieldConfig } from './IFieldConfig';

export interface IPlusModal {
    component: Type<any>;
    service?: IBaseService<any> | SimpleService<any>;
    modalOptions?: NgbModalOptions;
    config?: IFieldConfig[];
}