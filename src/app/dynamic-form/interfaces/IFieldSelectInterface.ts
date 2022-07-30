import {IBaseService} from '../../../../../interfaces/IBaseService';
import {IPlusModal} from './IPlusModal.interface';

export interface IFieldSelectInterface {
    items?: [...[], ...any],
    itemService: IBaseService<any>,
    plus?: IPlusModal
}
