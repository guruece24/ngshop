import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent {
  form: FormGroup;
  isSubmitted = false;
  editmode = false;
  currentProductId: string;


}
