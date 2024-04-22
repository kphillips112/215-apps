import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Course } from "../gpa-calculator/course";
import {
  MatGridList,
  MatGridListModule,
  MatGridTile,
} from "@angular/material/grid-list";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { NgFor, NgIf } from "@angular/common";
import { MatTable, MatTableDataSource, MatTableModule } from "@angular/material/table";
import { ConnectableObservable } from "rxjs";

@Component({
  selector: "app-food-calculator",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatGridList,
    MatGridListModule,
    MatGridTile,
    MatButtonModule,
    MatInputModule,
    NgFor,
    MatTableModule,
    FormsModule,
    NgIf
  ],
  templateUrl: "./gpa-calculator.component.html",
  styleUrl: "./gpa-calculator.component.css",
})
export class GpaCalculatorComponent implements OnInit {

  //SET UP FORM GROUP
  gpaForm!: FormGroup;
  grades = ['A', 'B', 'C', 'D', 'F'];
  letterGrades = ["A", "B", "C", "D","F"];

  //SET UP TABLE
  courseList: Course[] = [];
  displayedColumns: string[] = [
    "name",
    "code",
    "letterGrade",
    "creditHours",
    "delete"
  ];
  dataSource = new MatTableDataSource<Course>(this.courseList);
  @ViewChild(MatTable) courseTable!: MatTable<Course>;

  tableContainsData = false;

  //SET UP SUMMARY DATA
  totalGradePoint: number = 0;


  calculateTotalGpa() {
   
    let hoursTot = 0;
    let pointsTot = 0;
    for (let i = 0; i < this.courseList.length; i++) {
      hoursTot += this.courseList[i].creditHours;
      pointsTot += this.courseList[i].gradePoints * this.courseList[i].creditHours;
    }

    this.totalGradePoint = pointsTot / hoursTot;
    
  }
  



  //SET UP LAYOUT
  columns = 1;

  ngOnInit() {
    
    this.gpaForm = new FormGroup({
      name: new FormControl(),
      code: new FormControl(),
      letterGrade: new FormControl(),
      creditHours: new FormControl(),
    });
    let defaultGrade = "A";
    this.gpaForm.controls['letterGrade'].setValue(defaultGrade);
  }

  addCourse() {
    let newCourse = new Course (
       this.gpaForm.value.name,
       this.gpaForm.value.code,
       this.gpaForm.value.letterGrade,
       this.gpaForm.value.creditHours,
    );

    this.courseList.push(newCourse);
    console.log(this.courseList);
    this.gpaForm.reset();
    this.updateCourseData();
  }

  updateCourseData() {
    this.courseTable.renderRows();
    this.calculateTotalGpa();
    this.tableContainsData = this.courseList.length > 0;
  }

  deleteCourse(index: number) {
    this.courseList.splice(index, 1);
    this.updateCourseData();
  }

  clearTable(){
    this.courseList = [];
    this.dataSource.data = this.courseList;
    this.updateCourseData();
  }
}