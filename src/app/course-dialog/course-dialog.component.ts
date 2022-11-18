import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import {
   MAT_DIALOG_DATA,
   MatDialog,
   MatDialogConfig,
   MatDialogRef,
} from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from "moment";

@Component({
   selector: "course-dialog",
   templateUrl: "./course-dialog.component.html",
   styleUrls: ["./course-dialog.component.css"],
})
export class CourseDialogComponent implements OnInit {
   description: string;

   form = this.fb.group({
      description: [this.course.description, Validators.required],
      category: [this.course.category, Validators.required],
      releasedAt: [new Date(), Validators.required],
      longDescription: [this.course.longDescription, Validators.required],
   });

   constructor(
      private fb: FormBuilder,
      @Inject(MAT_DIALOG_DATA) private course: Course,
      private dialogRef: MatDialogRef<CourseDialogComponent>
   ) {
      this.description = course.description;
   }

   ngOnInit() {}

   close() {
      this.dialogRef.close();
   }

   save() {
      // p' pasar los valores editados a quien llamo el save
      this.dialogRef.close(this.form.value);
   }

   // HACER la fcn p' abrir el modal aca, p' poder reocupar la fcn donde sea q se requiera
}

export function openEditCourseDialog(dialog: MatDialog, course: Course) {
   const config = new MatDialogConfig();

   config.disableClose = false; // cierro con esc y picando afuera
   config.autoFocus = true;
   config.panelClass = "modal-panel";
   // config.backdropClass = "backdrop-modal-panel";
   config.enterAnimationDuration = "2000ms";

   // p' pasar la data al modal
   config.data = {
      ...course,
   };

   const dialogRef = dialog.open(CourseDialogComponent, config);

   return dialogRef.afterClosed();
}
