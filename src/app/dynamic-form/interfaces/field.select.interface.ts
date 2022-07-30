import {IBaseService} from '../../../../../interfaces/IBaseService';

export interface IFieldSelectInterface {
    items?: [...[], ...any],
    itemService: IBaseService<any>,
}
