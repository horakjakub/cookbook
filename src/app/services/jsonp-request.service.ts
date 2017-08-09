import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IRecipe } from './../models/recipe';
import 'rxjs/add/operator/map';

@Injectable()

export class JsonpRequestService {
    // @TODO change name on more generic with factory
  // full api docs: https://developer.edamam.com/edamam-docs-recipe-api

  private API_KEY: string = '2d181b5546aa25c292d6e779002aae54';
  private API_PATH: string = 'https://api.edamam.com/search';
  private API_ID: string = "8cff3f01";

  times = 0;

  constructor(private jsonp: Jsonp){
  }

  basicRequest(search: string, from?: number, to?: number, diet?: string, health?: string, calories?: string): Observable<IRecipe[]>{
    let params = new URLSearchParams();

    params.set('app_id', this.API_ID);
    params.set('app_key', this.API_KEY);

    params.set('q', search);

    typeof from === 'number' ? params.set('from', from.toString()) : false;
    typeof to === 'number' ? params.set('to', to.toString()) : false;
    typeof diet === 'string' ? params.set('diet', diet) : false;
    typeof health === 'string' ? params.set('health', health) : false;
    typeof calories === 'string' ? params.set('calories', calories) : false;

    params.set('callback', `__ng_jsonp__.__req${this.times}.finished`);

    this.times = this.times + 1;

    // TODO: Add error handling

    return this.jsonp
     .get(this.API_PATH, { search: params })
     .map(res => {
        return res.json().hits.map(item => item.recipe)
                  .map(item => {
                      let recipe: any = {};
                      recipe.imgUrl = item.image;
                      recipe.calories = item.calories;
                      recipe.label = item.label;
                      recipe.url = item.url;
                      recipe.ingredients = item.ingredientLines;
                      return recipe;
                  });
     });
  }
}
