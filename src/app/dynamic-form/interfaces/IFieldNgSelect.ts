import {EventEmitter} from '@angular/core';
import {IPlusModal} from './IPlusModal.interface';
import {Observable} from 'rxjs';

export interface IRows {
    rows: any[];
}

export interface IFieldNgSelectInterface {
    itemService: any;
    plus?: IPlusModal;
    // Dynamic is for scrolling, search on server and complex functions, if the data is simple then dynamic=false
    dynamic: boolean;
    loading?: boolean,
    notSearchable?: boolean,
    filter?: { [key: string]: string | string[] | number | number[] | boolean };
    items?: [...[], ...any];
    autoLoadItems?: boolean;
    readonly?: boolean;
    bindLabel?: string;
    bindValue?: string;
    multiple?: boolean;
    groupBy?: string;
    bindColor?: string;
    method?: Observable<IRows>;
    onChange?: EventEmitter<any>;

    transformData?(data): any[];
}
