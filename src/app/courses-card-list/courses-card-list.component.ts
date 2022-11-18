import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { openEditCourseDialog } from "../course-dialog/course-dialog.component";
import { pipe } from "rxjs";
import { filter } from "rxjs/operators";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Component({
   selector: "courses-card-list",
   templateUrl: "./courses-card-list.component.html",
   styleUrls: ["./courses-card-list.component.css"],
})
export class CoursesCardListComponent implements OnInit {
   @Input()
   courses: Course[];
   cols = 3;
   rowHeight = "500px";

   handsetPortrait = false; // 🌟 dinamic class

   constructor(
      private dialog: MatDialog,
      private responsive: BreakpointObserver
   ) {}

   ngOnInit() {
      this.responsive
         .observe([
            Breakpoints.Tablet,
            Breakpoints.TabletLandscape,
            Breakpoints.HandsetPortrait,
            Breakpoints.HandsetLandscape,
         ])
         .subscribe((retult) => {
            this.cols = 3;
            this.rowHeight = "500px";
            this.handsetPortrait = false; // 🌟

            const breakpoints = retult.breakpoints;

            if (breakpoints[Breakpoints.TabletPortrait]) {
               this.cols = 1;
            } else if (breakpoints[Breakpoints.HandsetPortrait]) {
               this.cols = 1;
               this.rowHeight = "400px";
               this.handsetPortrait = true; // 🌟
            } else if (breakpoints[Breakpoints.HandsetLandscape]) {
               this.cols = 1;
            } else if (breakpoints[Breakpoints.TabletLandscape]) {
               this.cols = 2;
            }
         });
   }

   editCourse(course: Course) {
      // subscribe p' agarrar los valores editados, emite valores despues de cerrado ( afterClose )
      // si simplemente cierra el modal si guardar => no se pasan valores y no llego al subscribe, xlo q simplemente se cierra
      openEditCourseDialog(this.dialog, course)
         .pipe(filter((val) => !!val))
         .subscribe((val) => console.log("new value: ", val));
   }
}
