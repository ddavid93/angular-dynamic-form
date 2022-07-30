import {UppyEventMap, UppyOptions} from '@uppy/core';
import {DashboardOptions} from '@uppy/dashboard';
import {XHRUploadOptions} from '@uppy/xhr-upload';
import {Subject} from 'rxjs';

export interface IUppy {
    props?: DashboardOptions;
    conf?: UppyOptions;
    xhrOptions?: XHRUploadOptions;
    events?: IEvent[];
}

interface IEvent {
    name: string;
    subject: Subject<any>,
    event: keyof UppyEventMap
}