export class Course {
    name: string;
    code: number;
    letterGrade: string;
    creditHours: number;
    

    constructor(
        name: string,
        code: number,
        letterGrade: string,
        creditHours: number,
       
    ) {
        this.name = name;
        this.code = code;
        this.letterGrade = letterGrade;
        this.creditHours = creditHours;
    
    }

    
    get gradePoints(): number {
        if (this.letterGrade === "A") {
            return 4;
        } else if (this.letterGrade === "B") {
            return 3;
        } else if (this.letterGrade === "C") {
            return 2;
        } else if (this.letterGrade === "D") {
            return 1;
        } else if (this.letterGrade === "F") {
            return 0;
        }
        
        return 0; // Default return statement
    }

   

    // makeLowCal(reductionPercentage: number = 50): void{
    //     if (reductionPercentage < 0 && reductionPercentage >= 100) {
    //     this.gradePoint -= this.gradePoint * (reductionPercentage / 100);
    // }

    // }
}