import { Component, OnInit, ViewChild } from "@angular/core";
import { Ingredient } from "./Ingredients";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { IngredientFormComponent } from "../ingredient-form/ingredient-form.component";
import { RouterLink, RouterOutlet } from "@angular/router";
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from "@angular/material/table";
import { Observable } from "rxjs/internal/Observable";
import { BreakpointService } from "../../breakpoint.service";
import { combineLatest, merge } from "rxjs";
import { map } from "rxjs/operators";
import { caloriesToKilojoulesConverter } from "../recipes-utilities";

@Component({
  selector: "app-ingredients-table",
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    IngredientFormComponent,
    RouterOutlet,
    CommonModule,
    RouterLink,
    MatTableModule,
  ],
  templateUrl: "./ingredients-table.component.html",
  styleUrl: "./ingredients-table.component.css",
})
export class IngredientsTableComponent implements OnInit {
  //these values are observables that will be used to determine the current screen size and can be accessed from the html template
  isHandsetPortrait$!: Observable<boolean>;
  isHandsetLandscape$!: Observable<boolean>;
  notAHandset$!: Observable<boolean>;

  showMoreInfoText: boolean = false; //whether we show text indicating that more info is available

  constructor(private breakpointService: BreakpointService) {
    //this constructor is used to inject the BreakpointService into the component
    //it is marked as private so that it can be used within the component
    //we now can access it within the component with this.breakpointService
  }

  //define the columns to be displayed in the table. We start with three in mobile-first mode and will add the others when we know the size is larger
  //these are only used to identify each column within our code, not to display anything, so we'll use human-readable names properly capitalized when we define the columns
  displayedColumns: string[] = ["name", "amount", "unit"];

  ngOnInit() {
    //this sets the observables to the values of the current screen size
    this.isHandsetPortrait$ = this.breakpointService.isHandsetPortrait$;
    this.isHandsetLandscape$ = this.breakpointService.isHandsetLandscape$;
    this.notAHandset$ = this.breakpointService.notAHandset$;

    //combineLatests listens to multiple observables and emits an array of the latest values from each observable whenever any of the observables emits a value
    combineLatest([this.isHandsetLandscape$, this.notAHandset$])
      .pipe(
        map(([isHandsetLandscape, notAHandset]) => {
          //we get both current values and then set the displayedColumns based on the current values. Default to the smallest screen size.
          if (isHandsetLandscape) {
            this.showMoreInfoText = true;
            return ["name", "amount", "unit", "price"];
            //this sends the column names to the map operator and then to the pipe
          } else if (notAHandset) {
            this.showMoreInfoText = false;
            return [
              "name",
              "amount",
              "unit",
              "calories",
              "kilojoules",
              "price",
              "pricePerCalorie",
            ];
          } else {
            this.showMoreInfoText = true;
            //even though this is the default, we'll still set it explicitly because the screen size could change after the component is initialized
            return ["name", "amount", "unit"];
          }
        }),
      )
      //the pipe pops out an array of the column names we want, and we will name that output "columns" when we subscribe to it
      .subscribe((columns) => {
        //we have a subscription to the observable that sets the displayedColumns based on the current values
        this.displayedColumns = columns;
      });
  }

  //get a reference to the MatTable
  //ViewChild is a decorator that is used to get a reference to a child component, directive, or element
  //We're telling MatTable that it will have rows of type Ingredient
  @ViewChild(MatTable) ingredientTable!: MatTable<Ingredient>;

  ingredientArray: Ingredient[] = [
    {
      name: "flour",
      amount: 2,
      unit: "Cup",
      calories: 455,
      price: 20.5,
      id: "1",
    },
    { name: "sugar", amount: 1, unit: "Cup", calories: 774, price: 2, id: "2" },
    {
      name: "butter",
      amount: 0.5,
      unit: "Cup",
      calories: 810,
      price: 1.5,
      id: "3",
    },
    {
      name: "vanilla",
      amount: 1,
      unit: "Teaspoon",
      calories: 12,
      price: 1,
      id: "4",
    },
    {
      name: "baking soda",
      amount: 1,
      unit: "Teaspoon",
      calories: 0,
      price: 1,
      id: "5",
    },
    {
      name: "chocolate chips",
      amount: 2,
      unit: "Cup",
      calories: 805,
      price: 3,
      id: "6",
    },
  ];

  //create a MatTableDataSource from the ingredientArray. This lets us use the MatTable to display the data and sort it (later)
  dataSource = new MatTableDataSource<Ingredient>(this.ingredientArray);

  onIngredientAdded(ingredient: Ingredient) {
    console.log("ingredient added");
    this.ingredientArray.push(ingredient);
    //update the matTable by calling for it to refresh its rows
    this.ingredientTable.renderRows();
  }

  pricePerCalorie({
    calories,
    price,
  }: {
    calories: number;
    price: number;
  }): string {
    if (calories === 0 || price === 0) {
      return "--";
    }
    return (price / calories).toFixed(3);
  }

  calToKilo = caloriesToKilojoulesConverter;
}
