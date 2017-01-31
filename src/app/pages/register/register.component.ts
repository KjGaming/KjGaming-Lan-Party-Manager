import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator, DateValidator} from '../../theme/validators';
import {PostalCodeValidator} from "../../theme/validators/postalCode.validator";
import {BaAuthService} from "../../theme/services";
import {User} from "../../theme/model";
import {Router} from "@angular/router";
import {NotificationsService} from "angular2-notifications/src/notifications.service";
import {IMyOptions, IMyDateModel} from 'mydatepicker';

@Component({
    selector: 'register',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./register.scss')],
    template: require('./register.html'),
})
export class Register {

    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };

    public lanPacketData = [
        {value: 0, display: 'Wähle ein Paket'},
        {value: 0, display: 'Sparpaket (15€)'},
        {value: 1, display: 'Komplettpaket (30€)'},
        {value: 2, display: 'Individuelles Paket'}
    ];

    public eatPackets = [
        {value: 0, display: 'Abendessen 20.04 (4€)', price: 4},
        {value: 1, display: 'Frühstück 21.04 (2€)', price: 2},
        {value: 2, display: 'Mittagessen 21.04 (3€)', price: 3},
        {value: 3, display: 'Abendessen 21.04 (4€)', price: 4},
        {value: 4, display: 'Frühstück 22.04 (2€)', price: 2},
        {value: 5, display: 'Mittagessen 22.04 (3€)', price: 3},
        {value: 6, display: 'Abendessen 22.04 (4€)', price: 4},
        {value: 7, display: 'Frühstück 23.04 (3€)', price: 2}
    ];

    public options = {
        position: ['top', 'center'],
        timeOut: 5000
    };

    error;

    packetId = 0;
    checkboxAGB = false;
    checkboxVegi = false;
    amount: number = 0;
    lanFood: number[] = [0, 0, 0, 0, 0, 0, 0, 0];

    public form: FormGroup;
    public lanPacket: AbstractControl;
    public nickname: AbstractControl;
    public birth: AbstractControl;
    public street: AbstractControl;
    public nr: AbstractControl;
    public postalCode: AbstractControl;
    public city: AbstractControl;
    public vegi: AbstractControl;
    public lastname: AbstractControl;
    public firstname: AbstractControl;
    public email: AbstractControl;
    public password: AbstractControl;
    public repeatPassword: AbstractControl;
    public passwords: FormGroup;

    public submitted: boolean = false;

    constructor(fb: FormBuilder,
                private authService: BaAuthService,
                private router: Router,
                private _toastService: NotificationsService) {

        this.form = fb.group({
            'lanPacket': ['', Validators.required],
            'nickname': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            'firstname': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            'lastname': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
            'birth': ['', Validators.compose([Validators.required, DateValidator.validate])],
            'street': ['', Validators.required],
            'nr': ['', Validators.required],
            'postalCode': ['', Validators.compose([Validators.required, PostalCodeValidator.validate])],
            'city': ['', Validators.required],

            /*'vegi': ['', Validators.required],*/
            'passwords': fb.group({
                'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
                'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
            }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
        });

        this.lanPacket = this.form.controls['lanPacket'];
        this.nickname = this.form.controls['nickname'];
        this.firstname = this.form.controls['firstname'];
        this.lastname = this.form.controls['lastname'];
        this.email = this.form.controls['email'];
        this.birth = this.form.controls['birth'];
        this.street = this.form.controls['street'];
        this.nr = this.form.controls['nr'];
        this.postalCode = this.form.controls['postalCode'];
        this.city = this.form.controls['city'];
        this.passwords = <FormGroup> this.form.controls['passwords'];
        this.password = this.passwords.controls['password'];
        this.repeatPassword = this.passwords.controls['repeatPassword'];
        /* this.vegi = this.form.controls['vegi'];*/
    }


    addAmountLanPacket(lanNumber: number): void {
        console.log(lanNumber);

        if (lanNumber == 0) {
            this.amount = 15;
            this.packetId = 0;
        } else if (lanNumber == 1) {
            this.amount = 30;
            this.packetId = 1;
        } else {
            this.amount = 15;
            this.packetId = 2;
        }
    }

    addAmountFood(checked: boolean, price: number, value: number) {
        if (checked) {
            this.amount += price;
            this.lanFood[value] = 1;
        } else {
            this.amount -= price;
            this.lanFood[value] = 0;
        }
    }

    public onSubmit(values: Object): void {
        this.submitted = true;
        if (this.form.valid) {
            let date = new Date(values['birth']);

            let lanFoodString = this.lanFood.toString();
            lanFoodString = lanFoodString.replace(/,/g, "");

            const user = new User(
                values['email'], // email
                values['passwords']['password'], // password
                values['nickname'], // nickname
                values['firstname'], // firstname
                values['lastname'], // lastname
                date, // birth
                0, //User role
                false, // User lock
                values['street'], // street
                values['nr'], // nr
                values['postalCode'], // postalCode
                values['city'], // city
                this.checkboxAGB, // agb
                0, // Seat place at the LAN Event
                null, // Clan ID
                this.packetId, // Packet id
                false, // Packet paid or not
                this.amount,// Packet price
                lanFoodString,// Food id
                this.checkboxVegi,// User vegitable
                0,// Outher coast like drinks, snacks and so on
                false// Paid all


            );

            this.authService.signup(user)
                .subscribe(
                    data => {
                        localStorage.setItem('regToken', 'LoggedInSuccessfully');
                        console.log(data);
                        this.router.navigateByUrl('/confirmReg');
                    },
                    error => {
                        this._toastService.error(error.title, error.error.message);
                        this.error = error;
                    }
                );

        }
    }
}
