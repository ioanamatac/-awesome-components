import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ComplexFormValue } from "../models/complex-form-value.model";
import { Observable, catchError, delay, mapTo, of, } from "rxjs";

@Injectable()
export class ComplexFormService {
    constructor(private http: HttpClient){}

    saveUserInfo(formValue: ComplexFormValue): Observable<boolean>{
        return this.http.post('http://localhost:3000/api/users', formValue).pipe(
           //mapTo pour transformer tout reponse du server-si la requete pas alors true
            mapTo(true),
            //simuler un délai de reseau
            delay(1000),
            //catchError retourne un Observable a false pour une requête échouée
            catchError(() => of(false).pipe(
                delay(1000)
            ))
            
        );
    }



}