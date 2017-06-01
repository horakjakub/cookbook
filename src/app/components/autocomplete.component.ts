import { Component, Input } from '@angular/core';

@Component({
        selector: 'autocomplete',
        templateUrl: './autocomplete.component.html',
        styleUrls: ['./autocomplete.component.css']
})

export class AutocompleteComponent {
        private _searchedPhrase: string = '';

        set searchedPhrase(phrase: string){
          this._searchedPhrase = phrase;
        }

        get searchedPhrase(){
          return this._searchedPhrase;
        }

        private _dupa: string = '';

        set dupa(phrase: string){
          this._dupa = phrase;
        }

        get dupa(){
          return this._dupa;
        }
  }
