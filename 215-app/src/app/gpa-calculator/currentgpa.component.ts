// import { Component, OnInit, ViewChild } from "@angular/core";
// import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { MatFormFieldModule } from "@angular/material/form-field";
// import { Course } from "../gpa-calculator/course";
// import {
//   MatGridList,
//   MatGridListModule,
//   MatGridTile,
// } from "@angular/material/grid-list";
// import { MatButtonModule } from "@angular/material/button";
// import { MatInputModule } from "@angular/material/input";
// import { NgFor, NgIf } from "@angular/common";
// import { MatTable, MatTableDataSource, MatTableModule } from "@angular/material/table";
// import { ConnectableObservable } from "rxjs";

// @Component({
//   selector: "app-food-calculator",
//   standalone: true,
//   imports: [
//     ReactiveFormsModule,
//     MatFormFieldModule,
//     MatGridList,
//     MatGridListModule,
//     MatGridTile,
//     MatButtonModule,
//     MatInputModule,
//     NgFor,
//     MatTableModule,
//     FormsModule,
//     NgIf
//   ],
//   templateUrl: "./gpa-calculator.component.html",
//   styleUrl: "./gpa-calculator.component.css",
// })
// export class GpaCalculatorComponent implements OnInit {

 

  



//   //SET UP LAYOUT
//   columns = 1;

//   ngOnInit() {
    
//     this.currentGpaForm = new FormGroup({
//       currentGpa: new FormControl(),
//       currentCreditHours: new FormControl(),

//     });

//   }

//   addCourse() {
//     let newCourse = new Course (
//        this.gpaForm.value.name,
//        this.gpaForm.value.code,
//        this.gpaForm.value.letterGrade,
//        this.gpaForm.value.creditHours,
//     );

//     this.courseList.push(newCourse);
//     console.log(this.courseList);
//     this.gpaForm.reset();
//     this.updateCourseData();
//   }

//   updateCourseData() {
//     this.calculateTotalGpa();
//     this.tableContainsData = this.courseList.length > 0;
//   }




// }