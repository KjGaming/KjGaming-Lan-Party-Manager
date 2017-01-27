import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BaSendMailService } from "../../theme/services";
import { Mail } from "../../theme/model";
import {NotificationsService} from "angular2-notifications/src/notifications.service";


@Component({
    selector: 'feedback',
    styles: [require('./feedback.scss')],
    template: require('./feedback.component.html')
})


export class FeedbackComponent {

    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };

    public form: FormGroup;
    public subject: AbstractControl;
    public text: AbstractControl;
    public submitted: boolean = false;

    constructor(fb: FormBuilder, private router: Router, private sendMailService: BaSendMailService, private _toastService: NotificationsService) {
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

            const mail = new Mail(
                values['subject'],
                values['text'],
                "Feedback Formular"
            );

            this.sendMailService.sendMail(mail)
               .subscribe(
                    data => {
                        this._toastService.success(data.message, '');
                        console.log(data)
                    },
                    error => {
                        this._toastService.error(error.title,error.error.message);
                        console.error(error)
                    }
                );

        }
    }


}
