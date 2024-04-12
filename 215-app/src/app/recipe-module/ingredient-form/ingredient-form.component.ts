import { NgFor } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Ingredient } from "../ingredients-table/Ingredients";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { BreakpointService } from "../../breakpoint.service";
import { Observable } from "rxjs";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";

@Component({
  selector: "app-ingredient-form",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridList,
    MatGridTile,
  ],
  templateUrl: "./ingredient-form.component.html",
  styleUrl: "./ingredient-form.component.css",
})
export class IngredientFormComponent implements OnInit {
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  isHandset$!: Observable<boolean>;
  //set the default number of columns for our form to match the smallest screen size
  columns: number = 1;

  ingredientsForm!: FormGroup;

  constructor(private breakpointService: BreakpointService) {}

  //make a list of units to display in the dropdown
  units = ["Cup", "Ounce", "Pound", "Tablespoon", "Teaspoon", "Each"];

  ngOnInit(): void {
    this.ingredientsForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl("1", Validators.required),
      unit: new FormControl("Cup"), //create a default value for the dropdown
      calories: new FormControl(null),
      kilojoules: new FormControl(null),
      price: new FormControl(null, Validators.required),
    });

    //subscribe to the isHandset$ observable to get the current screen size
    this.isHandset$ = this.breakpointService.isHandsetPortrait$;

    //subscribe to the isHandset$ observable and set columns to 2 if it is not a handset
    this.isHandset$.subscribe((isHandset) => {
      if (!isHandset) {
        this.columns = 2;
      } else {
        //this will set the number of columns to 1 if the screen size reverts to a handset
        this.columns = 1;
      }
    });
  }

  cleanupInputText(formText: string): string {
    console.log("formText 1: " + formText);
    formText = formText.trim();
    console.log("formText 2: " + formText);
    //remove any leading or trailing commas
    formText = formText.replace(/^,|,$/g, "");
    //remove any extra spaces
    formText = formText.replace(/\s+/g, " ");
    //capitalize the first letter
    formText = formText.charAt(0).toUpperCase() + formText.slice(1);
    console.log("final formtext 3: " + formText);
    return formText;
  }

  convertedCalories(calories?: number, kilojoules: number = 100): number {
    //The reason the kj value doesn't default to 100 when the form is submitted is because the form will always have a value for kilojoules, even if it is 0 or null.
    //The default value will kick in only if we don't have a kj field in the form in the first place.
    if (calories) {
      //return calories from the form
      return calories;
    } else if (kilojoules) {
      return parseInt((kilojoules / 4.184).toFixed(0));
    } else return 0;
  }

  async waitOnIngredient() {
    console.log("Wait begins");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("done");
      }, 4000);
    });
  }

  onSubmit() {
    this.waitOnIngredient()
      .then(() => {
        console.log("Wait ends ");
        if (this.ingredientsForm.valid) {
          console.log(this.ingredientsForm.value);
          const newIngredient: Ingredient = {
            name: this.cleanupInputText(this.ingredientsForm.value.name),
            amount: this.ingredientsForm.value.amount,
            unit: this.ingredientsForm.value.unit,
            calories: this.convertedCalories(
              this.ingredientsForm.value.calories,
              this.ingredientsForm.value.kilojoules,
            ),
            price: this.ingredientsForm.value.price,
            id: Math.random().toString(),
          };

          console.log(newIngredient);
          this.ingredientAdded.emit(newIngredient);
        } else {
          console.error("form invalid");
        }
      })
      .catch((error) => {
        console.error("Error: " + error);
      });
  }
}
