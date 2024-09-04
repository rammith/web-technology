import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  showMessage: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.showAddedToCartMessage();
  }

  showAddedToCartMessage(): void {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000); // Message displayed for 3 seconds
  }
}
