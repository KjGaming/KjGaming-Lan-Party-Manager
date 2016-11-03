import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator, DateValidator } from '../../theme/validators';
import { PostalCodeValidator } from "../../theme/validators/postalCode.validator";
import { AuthService } from "../../theme/services";
import { User } from "../../theme/model";
import { ErrorService } from "../../theme/components/errors/error.service";

@Component({
    selector: 'register',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./register.scss')],
    template: require('./register.html'),
})
export class Register {
    public lanPacketData = [
        {value: null, display: 'Wähle ein Paket'},
        {value: 0, display: 'Sparpaket (15€)'},
        {value: 1, display: 'Komplettpaket (30€)'},
        {value: 2, display: 'Individuelles Paket'}
    ];

    public form: FormGroup;
    public lanPacket: AbstractControl;
    public nickname: AbstractControl;
    public birth: AbstractControl;
    public street: AbstractControl;
    public nr: AbstractControl;
    public postalCode: AbstractControl;
    public city: AbstractControl;
    public agb: AbstractControl;
    public vegi: AbstractControl;
    public name: AbstractControl;
    public email: AbstractControl;
    public password: AbstractControl;
    public repeatPassword: AbstractControl;
    public passwords: FormGroup;

    public submitted: boolean = false;

    constructor(fb: FormBuilder, private authService: AuthService) {

        this.form = fb.group({
            'lanPacket': ['', Validators.compose([Validators.required])],
            'nickname': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
            'birth': ['', Validators.compose([Validators.required, DateValidator.validate])],
            'street': ['', Validators.required],
            'nr': ['', Validators.required],
            'postalCode': ['', Validators.compose([Validators.required, PostalCodeValidator.validate])],
            'city': ['', Validators.required],
            'agb': ['', Validators.required],
            /*'vegi': ['', Validators.required],*/
            'passwords': fb.group({
                'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
                'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
            }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
        });

        this.lanPacket = this.form.controls['lanPacket'];
        this.nickname = this.form.controls['nickname'];
        this.name = this.form.controls['name'];
        this.email = this.form.controls['email'];
        this.birth = this.form.controls['birth'];
        this.street = this.form.controls['street'];
        this.nr = this.form.controls['nr'];
        this.postalCode = this.form.controls['postalCode'];
        this.city = this.form.controls['city'];
        this.agb = this.form.controls['agb'];
        this.passwords = <FormGroup> this.form.controls['passwords'];
        this.password = this.passwords.controls['password'];
        this.repeatPassword = this.passwords.controls['repeatPassword'];
        /* this.vegi = this.form.controls['vegi'];*/
    }

    public onSubmit(values: Object): void {
        this.submitted = true;
        if (this.form.valid) {
           let name = values['name'].split(" ");
            let date = new Date(values['birth']);
            let packet;
            switch (values['lanPacket']) {
                case 0:
                    packet = 0;
                    break;
                case 1:
                    packet = 255;
                    break;
                case 2:
                    packet = 100;
                    break;
                default:
                    break;
            }

            const user = new User(
                values['email'], // email
                values['passwords']['password'], // password
                values['nickname'], // nickname
                name[0], // firstname
                name[1], // lastname
                date, // birth
                0, //User role
                false, // User lock
                values['street'], // street
                values['nr'], // nr
                values['postalCode'], // postalCode
                values['city'], // city
                values['agb'], // agb
                0,
                null,
                packet
            );
            this.authService.signup(user)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );
            this.form.reset();
            console.log(user);
        }
    }
}
