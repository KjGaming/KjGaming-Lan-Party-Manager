import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
	BaThemeConfig
} from './theme.config';

import {
	BaThemeConfigProvider
} from './theme.configProvider';

import {
	BaAmChart,
	BaBackTop,
	BaCard,
	BaChartistChart,
	BaCheckbox,
	BaContentTop,
	BaFullCalendar,
	BaMenuItem,
	BaMenu,
	BaMsgCenter,
	BaMultiCheckbox,
	BaPageTop,
	BaPictureUploader,
	BaSidebar
} from './components';

import { BaCardBlur } from './components/baCard/baCardBlur.directive';

import {
	BaScrollPosition,
	BaSlimScroll,
	BaThemeRun
} from './directives';

import {
	BaAppPicturePipe,
	BaKameleonPicturePipe,
	BaProfilePicturePipe,
	BaOrderSwissSystemPipe

} from './pipes';

import {
	BaImageLoaderService,
	BaThemePreloader,
	BaThemeSpinner,
	BaAuthService,
	BaServerService,
	BaSendMailService,
	BaEventService,
	BaNewsService,
	BaCateringService,
	BaUserService,
	BaClanService,
	BaTournamentService,
	BaRoutingService,
	BaTextBoxService


} from './services';

import {
	EmailValidator,
	EqualPasswordsValidator,
	PostalCodeValidator,
	DateValidator
} from './validators';

const NGA_COMPONENTS = [
	BaAmChart,
	BaBackTop,
	BaCard,
	BaChartistChart,
	BaCheckbox,
	BaContentTop,
	BaFullCalendar,
	BaMenuItem,
	BaMenu,
	BaMsgCenter,
	BaMultiCheckbox,
	BaPageTop,
	BaPictureUploader,
	BaSidebar
];

const NGA_DIRECTIVES = [
	BaScrollPosition,
	BaSlimScroll,
	BaThemeRun,
	BaCardBlur
];

const NGA_PIPES = [
	BaAppPicturePipe,
	BaKameleonPicturePipe,
	BaProfilePicturePipe,
	BaOrderSwissSystemPipe
];

const NGA_SERVICES = [
	BaImageLoaderService,
	BaThemePreloader,
	BaThemeSpinner,
	BaAuthService,
	BaServerService,
	BaSendMailService,
	BaEventService,
	BaNewsService,
	BaCateringService,
	BaUserService,
	BaClanService,
	BaTournamentService,
	BaRoutingService,
	BaTextBoxService
];

const NGA_VALIDATORS = [
	EmailValidator,
	EqualPasswordsValidator,
	PostalCodeValidator,
	DateValidator
];

@NgModule({
	declarations: [
		...NGA_PIPES,
		...NGA_DIRECTIVES,
		...NGA_COMPONENTS
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
	],
	exports: [
		...NGA_PIPES,
		...NGA_DIRECTIVES,
		...NGA_COMPONENTS
	]
})
export class NgaModule {
	static forRoot(): ModuleWithProviders {
		return <ModuleWithProviders> {
			ngModule: NgaModule,
			providers: [
				BaThemeConfigProvider,
				BaThemeConfig,
				...NGA_VALIDATORS,
				...NGA_SERVICES
			],
		};
	}
}
