import { Routes } from "@angular/router";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { DetailPageComponent } from "./detail-page/detail-page.component";
import { IngredientsTableComponent } from "./recipe-module/ingredients-table/ingredients-table.component";
import { IngredientDetailComponent } from "./recipe-module/ingredient-detail/ingredient-detail.component";
import { arbitraryGuard } from "./site-guards.guard";
import { NotFoundComponent } from "./not-found/not-found.component";
import { FoodCalculatorComponent } from "./calculator/food-calculator/food-calculator.component";

export const routes: Routes = [
  { path: "profile", component: ProfilePageComponent, title: "Profile" },
  {
    path: "calculator",
    component: FoodCalculatorComponent,
    title: "Calculator",
  },
  {
    path: "detail",
    component: DetailPageComponent,
    title: "Detail",
    canActivate: [arbitraryGuard],
  },
  {
    path: "recipes",
    component: IngredientsTableComponent,
    title: "Recipes",
    children: [
      { path: "ingredient-detail", component: IngredientDetailComponent },
    ],
  },
  { path: "", component: ProfilePageComponent },
  { path: "**", component: NotFoundComponent },
];
