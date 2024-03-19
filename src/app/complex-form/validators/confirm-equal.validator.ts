//Ce Validator devra être placé sur un FormGroup et non sur un FormControl.

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

//il a besoin d'avoir accès à deux FormControls, enfants du FormGroup.
//Le Validator requiert deux paramètres : les noms des deux champs à vérifier.
export function confirmEqualValidator(main: string, confirm: string): ValidatorFn{
    return(ctrl: AbstractControl): null | ValidationErrors => {
        if(!ctrl.get(main) || !ctrl.get(confirm)) {
            
            return {
                valuesNotEqual:'Invalid control names'
            };
        }
        const mainValue = ctrl.get(main)!.value;
        const confirmValue = ctrl.get(confirm)!.value;
        
        return mainValue === confirmValue ? null : {
            valuesNotEqual: {
                main: mainValue,
                confirm: confirmValue
            }
        };
    };
}