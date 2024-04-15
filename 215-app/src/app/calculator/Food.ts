export class Food {
  // Properties
  foodName: string;
  calories: number;
  units: number;
  unitType: string;
  price?: number;
  gpa?: number; // GPA property
  totalCreditHours?: number; // New property for total credit hours

  constructor(
    foodName: string,
    calories: number,
    units: number,
    unitType: string,
    price?: number,
    gpa?: number, // GPA parameter in the constructor
    totalCreditHours?: number, // New parameter for total credit hours
  ) {
    this.foodName = foodName;
    this.calories = calories;
    this.units = units;
    this.unitType = unitType;
    this.price = price;
    this.gpa = gpa; // Initialize the GPA property
    this.totalCreditHours = totalCreditHours; // Initialize the total credit hours property
  }

  get kilojoules(): number {
    return this.calories / .1;
  }
  // Method to update the GPA
  updateGpa(newGrade: number, creditHours: number): void {
    if (this.gpa !== undefined && this.totalCreditHours !== undefined) {
      this.gpa = ((this.gpa * this.totalCreditHours) + (newGrade * creditHours)) / (this.totalCreditHours + creditHours);
      this.totalCreditHours += creditHours;
    } else {
      this.gpa = newGrade;
      this.totalCreditHours = creditHours;
    }
  }
}
