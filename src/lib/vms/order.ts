import { DateTime } from "luxon";
import { Member, Order, OrderStatus, PackagingType, Product } from "../awsApis";
import { DEFAULT_PACKAGES } from "../constants";

export class OrderVM {
  orderNumber: string;
  orderDate: string;
  orderValue: number;
  products: Product[];
  deliveryDetails: string;
  status: OrderStatus;
  trackingStatus?: string;
  trackingNumber?: string;
  packagingType: PackagingType;
  member: Member;
  packaging: Packaging;

  constructor(
    orderNumber: string,
    orderDate: string,
    orderValue: number,
    products: Product[],
    deliveryDetails: string,
    status: OrderStatus,
    packagingType: PackagingType,
    member: Member,
    trackingStatus?: string,
    trackingNumber?: string
  ) {
    this.orderNumber = orderNumber;
    this.orderDate = orderDate;
    this.orderValue = orderValue;
    this.products = products;
    this.deliveryDetails = deliveryDetails;
    this.status = status;
    this.trackingStatus = trackingStatus;
    this.trackingNumber = trackingNumber;
    this.packagingType = packagingType;
    this.member = member;
    this.packaging = DEFAULT_PACKAGES.filter(
      (pack) => pack.id === packagingType
    )[0];
  }
}
