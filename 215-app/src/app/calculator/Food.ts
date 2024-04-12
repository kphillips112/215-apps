export class Food {
  //properties
  foodName: string;
  calories: number;
  units: number;
  unitType: string;
  price?: number;

  constructor(
    foodName: string,
    calories: number,
    units: number,
    unitType: string,
    price?: number,
  ) {
    this.foodName = foodName;
    this.calories = calories;
    this.units = units;
    this.unitType = unitType;
    this.price = price;
  }

  get kilijoules(): number {
    return this.calories * 4.184;
  }

  makeLowCal(reductionPercentage: number = 50): void {
    if (reductionPercentage > 0 && reductionPercentage <= 100) {
      this.calories -= this.calories * (reductionPercentage / 100);
    }
  }
}
