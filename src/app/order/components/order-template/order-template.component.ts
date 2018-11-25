import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MotorcycleService } from 'src/app/motorcycle/services/motorcycle.service';
import { CarService } from 'src/app/car/services/car.service';
import { OrderService } from '../../services/order.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-order-template',
  templateUrl: './order-template.component.html',
  styleUrls: ['./order-template.component.css']
})
export class OrderTemplateComponent implements OnInit {

  vehicleOptions: any[] = [];
  selectedVehicle: any;

  constructor(
    private orderService: OrderService,
    private motorcycleService: MotorcycleService,
    private carService: CarService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  get carServiceName(): string {
    return CarService.name;
  }

  get motorcycleServiceName(): string {
    return MotorcycleService.name;
  }

  getVehicleImageSrc(selectedVehicle) {
    return `assets/${selectedVehicle.pictureId}.jpg`;
  }

  vehicletypeChanged(matselect: MatSelectChange) {
    if (matselect.value === CarService.serviceName) {
      this.carService.getCars().subscribe(cars => this.vehicleOptions = cars.body);
    } else {
      this.motorcycleService.getMotorcycles().subscribe(motorcycles => this.vehicleOptions = motorcycles);
    }
  }

  orderVehicle() {
    this.orderService.placeOrder(this.selectedVehicle.name).subscribe(result => {
      this.snackBar.open(`${result} is successvol besteld`, null, {
        duration: 4000
      });
    });
  }

}
