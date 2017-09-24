/**
 * Created by jhorak on 07.08.2017.
 */

export interface IConfirm {
    header?: string;
    message?: string;
    onConfirm?(): void;
}
