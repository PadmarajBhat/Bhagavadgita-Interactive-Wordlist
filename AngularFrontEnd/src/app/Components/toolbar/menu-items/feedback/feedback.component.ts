import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../service_files/common.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  width = window.innerWidth - window.innerWidth*.1
  profileForm = new FormGroup({
    name: new FormControl(''),
    contactNumber: new FormControl(''),
    comment: new FormControl('', [
      Validators.required,
      Validators.minLength(4)]),
  });
  constructor(private cs: CommonService) {
   
}

  ngOnInit(): void {
  }

  submitFeedBack() {
    console.log("Feedback Submitted", this.profileForm.value);
    this.cs.addFeedbackToDB(this.profileForm.value);
  }

}
