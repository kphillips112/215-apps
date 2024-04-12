import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ingredient-detail',
  standalone: true,
  imports: [],
  templateUrl: './ingredient-detail.component.html',
  styleUrl: './ingredient-detail.component.css',
})
export class IngredientDetailComponent {
  ingredientName: string = '';

  @Input()
  set id(value: string) {
    this.ingredientName = value ?? 'nothing';
    //todo: Create an ingredients service in this module to add and get ingredients
  }
}
