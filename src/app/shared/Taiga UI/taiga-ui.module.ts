import { NgModule } from '@angular/core';
import { TuiActionModule } from '@taiga-ui/kit';
import { TuiIslandModule } from '@taiga-ui/kit';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiDialogModule } from '@taiga-ui/core';
import { TuiSvgModule } from '@taiga-ui/core';
import { TuiMarkerIconModule } from '@taiga-ui/kit';
import { TuiStepperModule } from '@taiga-ui/kit'
import {TuiErrorModule} from '@taiga-ui/core';
import {TuiFieldErrorPipeModule} from '@taiga-ui/kit';
import {TuiDataListModule} from '@taiga-ui/core';
import {TuiDropdownModule} from '@taiga-ui/core';
import {TuiHostedDropdownModule} from '@taiga-ui/core';
import {TuiDataListWrapperModule, TuiComboBoxModule, TuiSelectModule} from '@taiga-ui/kit';
import {TuiPortalModule} from '@taiga-ui/cdk';
import {TuiStringifyContentPipeModule} from '@taiga-ui/kit';
import {TuiInputPasswordModule} from '@taiga-ui/kit';
import {TuiLinkModule} from '@taiga-ui/core';
import {TuiAlertModule, TuiRootModule} from '@taiga-ui/core';
import {TuiNotificationModule} from '@taiga-ui/core';
import {TuiLoaderModule} from '@taiga-ui/core';




const TaigaUIComponents = [
    TuiActionModule,
    TuiIslandModule,
    TuiInputModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiMarkerIconModule,
    TuiStepperModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiDataListModule,
    TuiDropdownModule,
    TuiHostedDropdownModule,
    TuiDataListWrapperModule,
    TuiSelectModule,
    TuiPortalModule,
    TuiComboBoxModule,
    TuiStringifyContentPipeModule,
    TuiInputPasswordModule,
    TuiLinkModule,
    TuiRootModule,
    TuiAlertModule,
    TuiNotificationModule,
    TuiDialogModule,
    TuiLoaderModule
  ]


@NgModule({
  imports: [TaigaUIComponents] ,
  exports: [TaigaUIComponents],
})

export class TaigaUIModule { }