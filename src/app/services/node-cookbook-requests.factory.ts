/**
 * Created by jhorak on 01.08.2017.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()

export class NodeCookbookRequestsFactory {
    private LOCAL_API_KEY: string = 'OLD4W4gLcxViydpgK0vRZJo8LaetrQDHTSfkVPrTi8okZfTMv6wmFsjHaxeLypwBrBq7Pmr0mefzaRw';
    private LOCAL_SERVER_PATH: string = 'http://localhost:8080/';
    private SERVER_PATH: string = 'https://radiant-mountain-93513.herokuapp.com/';

    constructor(private http: HttpClient){}

    get(url: string, options?: requestOptions): Observable<any>{
        let requestOptions;

        if(options !== undefined) {
            requestOptions = this.authenticatedRequestOptionsFactory(options)
        } else {
            requestOptions = this.authenticatedRequestOptionsFactory();
        }

        return this.http
            .get(this.LOCAL_SERVER_PATH + url, requestOptions);
    }

    put(url: string, reqBody, options?:requestOptions): Observable<any>{
        let requestOptions;

        if(options !== undefined) {
            requestOptions = this.authenticatedRequestOptionsFactory(options)
        } else {
            requestOptions = this.authenticatedRequestOptionsFactory();
        }

        requestOptions.headers = requestOptions.headers.set('Content-Type', 'application/json');

        return this.http
            .put(this.LOCAL_SERVER_PATH + url, JSON.stringify(reqBody), requestOptions);
    }

    post(url: string, reqBody, options?:requestOptions): Observable<any>{
        let requestOptions;

        if(options !== undefined) {
            requestOptions = this.authenticatedRequestOptionsFactory(options)
        } else {
            requestOptions = this.authenticatedRequestOptionsFactory();
        }

        requestOptions.headers = requestOptions.headers.set('Content-Type', 'application/json');

        return this.http
            .post(this.LOCAL_SERVER_PATH + url, JSON.stringify(reqBody), requestOptions);
    }

    delete(url: string, options?: requestOptions): Observable<any>{
        let requestOptions;

        if(options !== undefined) {
            requestOptions = this.authenticatedRequestOptionsFactory(options)
        } else {
            requestOptions = this.authenticatedRequestOptionsFactory();
        }

        requestOptions.headers = requestOptions.headers.set('Content-Type', 'application/json');

        return this.http
            .delete(this.LOCAL_SERVER_PATH + url, requestOptions);
    }


    private authenticatedRequestOptionsFactory(requestOptions?: requestOptions){
        let params, headers;
        let httpParams = new HttpParams(), httpHeaders = new HttpHeaders();

        if(requestOptions !== undefined){
            if(requestOptions.params !== undefined){
                if(Object.prototype.toString.call(requestOptions.params) !== '[object Array]'){
                    params = [];
                    params.push({ key: this.LOCAL_API_KEY });
                    params.push(requestOptions.params)
                } else {
                    params = requestOptions.params;
                    params.params.unshift({ key: this.LOCAL_API_KEY });
                }

                for(let i = 0; i < params.length; i++){
                    let key = Object.keys(params[i])[0];
                    httpParams = httpParams.set(key,params[i][key]);
                }
            }

            if(requestOptions.headers !== undefined){
                if(Object.prototype.toString.call(requestOptions.headers) !== '[object Array]'){
                    headers = [];
                    headers.push(requestOptions.headers)
                } else {
                    headers = requestOptions.headers;
                }

                for(let i = 0; i < headers.length; i++){
                    let key = Object.keys(headers[i])[0];
                    httpHeaders = httpHeaders.set(key,headers[i][key]);
                }
            }
        }

        return {
            params: httpParams.set('key', this.LOCAL_API_KEY),
            headers: httpHeaders
        }
    }
}

interface param {
    [key: string]: string;
}

export interface requestOptions {
    params?: param[] | param;
    headers?: param[] | param;
}



