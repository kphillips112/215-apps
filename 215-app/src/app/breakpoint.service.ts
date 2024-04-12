import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from "@angular/cdk/layout";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BreakpointService {
  //The $ at the end of the variable name is a convention to indicate that the variable is an Observable.
  //The pipe operator takes the result of the breakpointObserver.observe method and maps it to a boolean value.
  isHandsetPortrait$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.HandsetPortrait)
    .pipe(map((result) => result.matches));

  isHandsetLandscape$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.HandsetLandscape)
    .pipe(map((result) => result.matches));

  //return the opposite of the isHandset$ Observable
  notAHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.HandsetLandscape])
    .pipe(map((result) => !result.matches));

  constructor(private breakpointObserver: BreakpointObserver) {}
}
