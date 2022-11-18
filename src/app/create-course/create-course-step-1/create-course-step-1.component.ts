import { Component } from "@angular/core";
import { UntypedFormBuilder, Validators } from "@angular/forms";
import { MatCalendarCellClassFunction } from "@angular/material/datepicker";

const SAMPLE_TEXT =
   "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores corporis odit saepe quisquam itaque nisi sed voluptate nam, praesentium ipsa temporibus omnis, soluta eveniet provident eaque repellat officiis magni doloremque. Recusandae deserunt ducimus sequi iusto nobis optio pariatur minima veritatis quis. Laborum in aperiam totam, eligendi eius consequuntur accusantium!";

@Component({
   selector: "create-course-step-1",
   templateUrl: "create-course-step-1.component.html",
   styleUrls: ["create-course-step-1.component.scss"],
})
export class CreateCourseStep1Component {
   form = this.fb.group({
      title: [
         "",
         [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(60),
         ],
      ],
      releasedAt: [new Date(1980, 4, 2), Validators.required],
      category: ["BEGINNER", Validators.required],
      courseType: ["premium", Validators.required],
      downloadsAllowed: [false, Validators.requiredTrue],
      longDescription: [
         SAMPLE_TEXT,
         [Validators.required, Validators.minLength(3)],
      ],
   });

   // para darle estilo a una celda
   // cellDate en donde voy a poner la clase
   // view puede ser la month-view o year-view
   // el estilo q voy a poner a los elementos del datepicker los tengo q poner globales (scss) NO en el de este scss
   dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
      const date = cellDate.getDate();

      if (view == "month") {
         // p' el segundo dia
         return date == 1 ? "highlight-date" : "";
      }

      return "";
   };

   constructor(private fb: UntypedFormBuilder) {}

   get courseTitle() {
      return this.form.controls["title"];
   }
}
