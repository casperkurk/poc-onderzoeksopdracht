import { Component, OnInit } from '@angular/core';
import { MotorcycleService } from '../../services/motorcycle.service';

@Component({
  selector: 'app-motorcycles-template',
  templateUrl: './motorcycles-template.component.html',
  styleUrls: ['./motorcycles-template.component.css']
})
export class MotorcyclesTemplateComponent implements OnInit {
  motorcycles: any;

  constructor(private motorcycleService: MotorcycleService) { }

  ngOnInit() {
    this.motorcycleService.getMotorcycles().subscribe(motorcycles => {
      this.motorcycles = motorcycles;
    }, error => console.error(error)
    );
  }

  getMotorcycleImageSrc(motorcycle: any) {
    return `assets/${motorcycle.pictureId}.jpg`;
  }

}
