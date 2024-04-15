import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Food } from "../Food";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { NgFor, NgIf } from "@angular/common";
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from "@angular/material/table";

@Component({
  selector: "app-food-calculator",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatGridList,
    MatGridTile,
    MatButtonModule,
    MatInputModule,
    NgFor,
    MatTableModule,
    NgIf,
    FormsModule,
  ],
  templateUrl: "./food-calculator.component.html",
  styleUrl: "./food-calculator.component.css",
})
export class FoodCalculatorComponent implements OnInit {
  //SET UP FORM GROUP
  foodForm!: FormGroup;
  unitTypes = ["Core", "Elective", "General Elective"];

  //SET UP TABLE
  foodList: Food[] = [];
  displayedColumns: string[] = [
    "foodName",
    "calories",
    "units",
    "unitType",
    "price",
    "delete",
  ];
  dataSource = new MatTableDataSource<Food>(this.foodList);
  @ViewChild(MatTable) foodTable!: MatTable<Food>;
  tableContainsData = false;

  //SET UP SUMMARY DATA
  totalCalories: number = 0;
  totalPrice: number = 0;

  calculateTotalCalories() {
    this.totalCalories = this.foodList.reduce(
      (acc, food) => acc + (food.calories * food.units) / 100,
      0
    );
    if (this.foodList.length > 0) {
      this.totalCalories /= this.foodList.length;
    }
}

  calculatePrice() {
    this.totalPrice = this.foodList.reduce((acc, food) => {
      if (!food.price) return acc;
      return acc + (food.price * food.units);
    }, 0);
  }

  //SET UP LAYOUT
  columns = 1;

  ngOnInit() {
    this.foodForm = new FormGroup({
      foodName: new FormControl(),
      calories: new FormControl(),
      units: new FormControl("1"),
      unitType: new FormControl(),
      price: new FormControl(),
      currentGPA: new FormControl(),
      currentCreditHours: new FormControl(),
      potentialGrade: new FormControl(),
      potentialCreditHours: new FormControl(),
    });
  }

  addFood() {
    let newFood = new Food(
      this.foodForm.value.foodName,
      this.foodForm.value.calories,
      this.foodForm.value.units,
      this.foodForm.value.unitType,
      this.foodForm.value.price,
    );

    let currentGPA = this.foodForm.value.currentGPA;
    let currentCreditHours = this.foodForm.value.currentCreditHours;
    let potentialGrade = this.foodForm.value.potentialGrade;
    let potentialCreditHours = this.foodForm.value.potentialCreditHours;

    let newGPA: number;
    if (
      currentGPA !== undefined &&
      currentCreditHours !== undefined &&
      potentialGrade !== undefined &&
      potentialCreditHours !== undefined
    ) {
      newGPA =
        ((currentGPA * currentCreditHours) +
          (potentialGrade * potentialCreditHours)) /
        (currentCreditHours + potentialCreditHours);
    } else {
      newGPA = currentGPA; // Keep the current GPA if any of the values is undefined
    }

    // Adjust the GPA of each existing item in the list
    const numRows = this.foodList.length + 1; // +1 to include the newly added item
    this.foodList.forEach((food) => {
      food.gpa = food.gpa ? food.gpa / numRows : undefined;
    });

    console.log(newGPA); // You can log the new GPA to the console or use it as needed

    this.foodList.push(newFood);
    this.foodForm.reset();
    this.updateFoodData();
  }

  updateFoodData() {
    this.foodTable.renderRows();
    this.calculateTotalCalories();
    this.calculatePrice();
    this.tableContainsData = this.foodList.length > 0;
  }

  deleteFood(index: number) {
    this.foodList.splice(index, 1);
    this.updateFoodData();
  }

  clearTable() {
    this.foodList = [];
    this.dataSource.data = this.foodList;
    this.updateFoodData();
  }
}
