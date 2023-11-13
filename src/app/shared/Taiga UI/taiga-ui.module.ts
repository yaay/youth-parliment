import { NgModule } from '@angular/core';
import { TuiActionModule } from '@taiga-ui/kit';
import { TuiIslandModule } from '@taiga-ui/kit';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiSvgModule } from '@taiga-ui/core';
import { TuiMarkerIconModule } from '@taiga-ui/kit';
import { TuiStepperModule } from '@taiga-ui/kit'


const TaigaUIComponents = [
    TuiActionModule,
    TuiIslandModule,
    TuiInputModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiMarkerIconModule,
    TuiStepperModule
]


@NgModule({
  imports: [TaigaUIComponents],
  exports: [TaigaUIComponents],
})

export class TaigaUIModule { }