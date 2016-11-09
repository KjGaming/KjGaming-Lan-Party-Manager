import { Component } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SendMailService} from "../../theme/services";


@Component({
    selector: 'feedback',
    styles: [require('./feedback.scss')],
    template: require('./feedback.component.html')
})


export class FeedbackComponent{
    public form: FormGroup;
    public subject: AbstractControl;
    public text: AbstractControl;
    public submitted: boolean = false;

    constructor(fb: FormBuilder, private router: Router, private sendMailService: SendMailService) {
        this.form = fb.group({
            'subject': ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9 \\.\\,\\!\\?\\-\\+]+')])],
            'text': ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9 \\.\\,\\!\\?\\-\\+]+')])]
        });


        this.subject = this.form.controls['subject'];
        this.text = this.form.controls['text'];
    }

    public onSubmit(values: Object): void {
        this.submitted = true;

        if (this.form.valid) {
            const feedback = {
                "subject": values['subject'],
                "text": values['text'],
                "info": "Feedback Form"
            };

            this.sendMailService.sendMail(feedback)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );

        }
    }



}
