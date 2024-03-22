/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateOrderInput = {
  id?: string | null,
  orderNumber: string,
  orderDate: string,
  orderValue: number,
  products: string,
  deliveryDetails: string,
  status: OrderStatus,
  trackingStatus?: string | null,
  trackingNumber?: string | null,
  packagingType: PackagingType,
  memberId?: string | null,
};

export enum OrderStatus {
  UNPAID = "UNPAID",
  PAID = "PAID",
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  CANCELLED = "CANCELLED",
}


export enum PackagingType {
  BOX_PACK = "BOX_PACK",
  FLAT_PACK = "FLAT_PACK",
}


export type ModelOrderConditionInput = {
  orderNumber?: ModelStringInput | null,
  orderDate?: ModelStringInput | null,
  orderValue?: ModelFloatInput | null,
  products?: ModelStringInput | null,
  deliveryDetails?: ModelStringInput | null,
  status?: ModelOrderStatusInput | null,
  trackingStatus?: ModelStringInput | null,
  trackingNumber?: ModelStringInput | null,
  packagingType?: ModelPackagingTypeInput | null,
  memberId?: ModelStringInput | null,
  and?: Array< ModelOrderConditionInput | null > | null,
  or?: Array< ModelOrderConditionInput | null > | null,
  not?: ModelOrderConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelOrderStatusInput = {
  eq?: OrderStatus | null,
  ne?: OrderStatus | null,
};

export type ModelPackagingTypeInput = {
  eq?: PackagingType | null,
  ne?: PackagingType | null,
};

export type Order = {
  __typename: "Order",
  id: string,
  orderNumber: string,
  orderDate: string,
  orderValue: number,
  products: string,
  deliveryDetails: string,
  status: OrderStatus,
  trackingStatus?: string | null,
  trackingNumber?: string | null,
  packagingType: PackagingType,
  memberId?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateOrderInput = {
  id: string,
  orderNumber?: string | null,
  orderDate?: string | null,
  orderValue?: number | null,
  products?: string | null,
  deliveryDetails?: string | null,
  status?: OrderStatus | null,
  trackingStatus?: string | null,
  trackingNumber?: string | null,
  packagingType?: PackagingType | null,
  memberId?: string | null,
};

export type DeleteOrderInput = {
  id: string,
};

export type CreateProductInput = {
  id?: string | null,
  title?: string | null,
  body?: string | null,
  variants?: string | null,
  quantity?: number | null,
  category?: string | null,
  price?: number | null,
  taxable?: boolean | null,
  published?: boolean | null,
  featuredImage?: string | null,
  otherImages?: Array< string | null > | null,
  size?: string | null,
  available?: boolean | null,
};

export type ModelProductConditionInput = {
  title?: ModelStringInput | null,
  body?: ModelStringInput | null,
  variants?: ModelStringInput | null,
  quantity?: ModelIntInput | null,
  category?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  taxable?: ModelBooleanInput | null,
  published?: ModelBooleanInput | null,
  featuredImage?: ModelStringInput | null,
  otherImages?: ModelStringInput | null,
  size?: ModelStringInput | null,
  available?: ModelBooleanInput | null,
  and?: Array< ModelProductConditionInput | null > | null,
  or?: Array< ModelProductConditionInput | null > | null,
  not?: ModelProductConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Product = {
  __typename: "Product",
  id: string,
  title?: string | null,
  body?: string | null,
  variants?: string | null,
  quantity?: number | null,
  category?: string | null,
  price?: number | null,
  taxable?: boolean | null,
  published?: boolean | null,
  featuredImage?: string | null,
  otherImages?: Array< string | null > | null,
  size?: string | null,
  available?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateProductInput = {
  id: string,
  title?: string | null,
  body?: string | null,
  variants?: string | null,
  quantity?: number | null,
  category?: string | null,
  price?: number | null,
  taxable?: boolean | null,
  published?: boolean | null,
  featuredImage?: string | null,
  otherImages?: Array< string | null > | null,
  size?: string | null,
  available?: boolean | null,
};

export type DeleteProductInput = {
  id: string,
};

export type CreateMemberInput = {
  id?: string | null,
  name: string,
  email: string,
  phone?: string | null,
  active: boolean,
  province?: string | null,
  city?: string | null,
  zip?: string | null,
  country?: string | null,
  address1?: string | null,
  address2?: string | null,
  deliveryPerson?: string | null,
  deliveryEmail?: string | null,
  deliveryAddress1?: string | null,
  deliveryAddress2?: string | null,
};

export type ModelMemberConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  province?: ModelStringInput | null,
  city?: ModelStringInput | null,
  zip?: ModelStringInput | null,
  country?: ModelStringInput | null,
  address1?: ModelStringInput | null,
  address2?: ModelStringInput | null,
  deliveryPerson?: ModelStringInput | null,
  deliveryEmail?: ModelStringInput | null,
  deliveryAddress1?: ModelStringInput | null,
  deliveryAddress2?: ModelStringInput | null,
  and?: Array< ModelMemberConditionInput | null > | null,
  or?: Array< ModelMemberConditionInput | null > | null,
  not?: ModelMemberConditionInput | null,
};

export type Member = {
  __typename: "Member",
  id: string,
  name: string,
  email: string,
  phone?: string | null,
  active: boolean,
  province?: string | null,
  city?: string | null,
  zip?: string | null,
  country?: string | null,
  address1?: string | null,
  address2?: string | null,
  deliveryPerson?: string | null,
  deliveryEmail?: string | null,
  deliveryAddress1?: string | null,
  deliveryAddress2?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateMemberInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  phone?: string | null,
  active?: boolean | null,
  province?: string | null,
  city?: string | null,
  zip?: string | null,
  country?: string | null,
  address1?: string | null,
  address2?: string | null,
  deliveryPerson?: string | null,
  deliveryEmail?: string | null,
  deliveryAddress1?: string | null,
  deliveryAddress2?: string | null,
};

export type DeleteMemberInput = {
  id: string,
};

export type ModelOrderFilterInput = {
  id?: ModelIDInput | null,
  orderNumber?: ModelStringInput | null,
  orderDate?: ModelStringInput | null,
  orderValue?: ModelFloatInput | null,
  products?: ModelStringInput | null,
  deliveryDetails?: ModelStringInput | null,
  status?: ModelOrderStatusInput | null,
  trackingStatus?: ModelStringInput | null,
  trackingNumber?: ModelStringInput | null,
  packagingType?: ModelPackagingTypeInput | null,
  memberId?: ModelStringInput | null,
  and?: Array< ModelOrderFilterInput | null > | null,
  or?: Array< ModelOrderFilterInput | null > | null,
  not?: ModelOrderFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelOrderConnection = {
  __typename: "ModelOrderConnection",
  items:  Array<Order | null >,
  nextToken?: string | null,
};

export type ModelProductFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  body?: ModelStringInput | null,
  variants?: ModelStringInput | null,
  quantity?: ModelIntInput | null,
  category?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  taxable?: ModelBooleanInput | null,
  published?: ModelBooleanInput | null,
  featuredImage?: ModelStringInput | null,
  otherImages?: ModelStringInput | null,
  size?: ModelStringInput | null,
  available?: ModelBooleanInput | null,
  and?: Array< ModelProductFilterInput | null > | null,
  or?: Array< ModelProductFilterInput | null > | null,
  not?: ModelProductFilterInput | null,
};

export type ModelProductConnection = {
  __typename: "ModelProductConnection",
  items:  Array<Product | null >,
  nextToken?: string | null,
};

export type ModelMemberFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  province?: ModelStringInput | null,
  city?: ModelStringInput | null,
  zip?: ModelStringInput | null,
  country?: ModelStringInput | null,
  address1?: ModelStringInput | null,
  address2?: ModelStringInput | null,
  deliveryPerson?: ModelStringInput | null,
  deliveryEmail?: ModelStringInput | null,
  deliveryAddress1?: ModelStringInput | null,
  deliveryAddress2?: ModelStringInput | null,
  and?: Array< ModelMemberFilterInput | null > | null,
  or?: Array< ModelMemberFilterInput | null > | null,
  not?: ModelMemberFilterInput | null,
};

export type ModelMemberConnection = {
  __typename: "ModelMemberConnection",
  items:  Array<Member | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionOrderFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  orderNumber?: ModelSubscriptionStringInput | null,
  orderDate?: ModelSubscriptionStringInput | null,
  orderValue?: ModelSubscriptionFloatInput | null,
  products?: ModelSubscriptionStringInput | null,
  deliveryDetails?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  trackingStatus?: ModelSubscriptionStringInput | null,
  trackingNumber?: ModelSubscriptionStringInput | null,
  packagingType?: ModelSubscriptionStringInput | null,
  memberId?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionOrderFilterInput | null > | null,
  or?: Array< ModelSubscriptionOrderFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionProductFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  body?: ModelSubscriptionStringInput | null,
  variants?: ModelSubscriptionStringInput | null,
  quantity?: ModelSubscriptionIntInput | null,
  category?: ModelSubscriptionStringInput | null,
  price?: ModelSubscriptionFloatInput | null,
  taxable?: ModelSubscriptionBooleanInput | null,
  published?: ModelSubscriptionBooleanInput | null,
  featuredImage?: ModelSubscriptionStringInput | null,
  otherImages?: ModelSubscriptionStringInput | null,
  size?: ModelSubscriptionStringInput | null,
  available?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionProductFilterInput | null > | null,
  or?: Array< ModelSubscriptionProductFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionMemberFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  active?: ModelSubscriptionBooleanInput | null,
  province?: ModelSubscriptionStringInput | null,
  city?: ModelSubscriptionStringInput | null,
  zip?: ModelSubscriptionStringInput | null,
  country?: ModelSubscriptionStringInput | null,
  address1?: ModelSubscriptionStringInput | null,
  address2?: ModelSubscriptionStringInput | null,
  deliveryPerson?: ModelSubscriptionStringInput | null,
  deliveryEmail?: ModelSubscriptionStringInput | null,
  deliveryAddress1?: ModelSubscriptionStringInput | null,
  deliveryAddress2?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMemberFilterInput | null > | null,
  or?: Array< ModelSubscriptionMemberFilterInput | null > | null,
};

export type CreateOrderMutationVariables = {
  input: CreateOrderInput,
  condition?: ModelOrderConditionInput | null,
};

export type CreateOrderMutation = {
  createOrder?:  {
    __typename: "Order",
    id: string,
    orderNumber: string,
    orderDate: string,
    orderValue: number,
    products: string,
    deliveryDetails: string,
    status: OrderStatus,
    trackingStatus?: string | null,
    trackingNumber?: string | null,
    packagingType: PackagingType,
    memberId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateOrderMutationVariables = {
  input: UpdateOrderInput,
  condition?: ModelOrderConditionInput | null,
};

export type UpdateOrderMutation = {
  updateOrder?:  {
    __typename: "Order",
    id: string,
    orderNumber: string,
    orderDate: string,
    orderValue: number,
    products: string,
    deliveryDetails: string,
    status: OrderStatus,
    trackingStatus?: string | null,
    trackingNumber?: string | null,
    packagingType: PackagingType,
    memberId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteOrderMutationVariables = {
  input: DeleteOrderInput,
  condition?: ModelOrderConditionInput | null,
};

export type DeleteOrderMutation = {
  deleteOrder?:  {
    __typename: "Order",
    id: string,
    orderNumber: string,
    orderDate: string,
    orderValue: number,
    products: string,
    deliveryDetails: string,
    status: OrderStatus,
    trackingStatus?: string | null,
    trackingNumber?: string | null,
    packagingType: PackagingType,
    memberId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateProductMutationVariables = {
  input: CreateProductInput,
  condition?: ModelProductConditionInput | null,
};

export type CreateProductMutation = {
  createProduct?:  {
    __typename: "Product",
    id: string,
    title?: string | null,
    body?: string | null,
    variants?: string | null,
    quantity?: number | null,
    category?: string | null,
    price?: number | null,
    taxable?: boolean | null,
    published?: boolean | null,
    featuredImage?: string | null,
    otherImages?: Array< string | null > | null,
    size?: string | null,
    available?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateProductMutationVariables = {
  input: UpdateProductInput,
  condition?: ModelProductConditionInput | null,
};

export type UpdateProductMutation = {
  updateProduct?:  {
    __typename: "Product",
    id: string,
    title?: string | null,
    body?: string | null,
    variants?: string | null,
    quantity?: number | null,
    category?: string | null,
    price?: number | null,
    taxable?: boolean | null,
    published?: boolean | null,
    featuredImage?: string | null,
    otherImages?: Array< string | null > | null,
    size?: string | null,
    available?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteProductMutationVariables = {
  input: DeleteProductInput,
  condition?: ModelProductConditionInput | null,
};

export type DeleteProductMutation = {
  deleteProduct?:  {
    __typename: "Product",
    id: string,
    title?: string | null,
    body?: string | null,
    variants?: string | null,
    quantity?: number | null,
    category?: string | null,
    price?: number | null,
    taxable?: boolean | null,
    published?: boolean | null,
    featuredImage?: string | null,
    otherImages?: Array< string | null > | null,
    size?: string | null,
    available?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMemberMutationVariables = {
  input: CreateMemberInput,
  condition?: ModelMemberConditionInput | null,
};

export type CreateMemberMutation = {
  createMember?:  {
    __typename: "Member",
    id: string,
    name: string,
    email: string,
    phone?: string | null,
    active: boolean,
    province?: string | null,
    city?: string | null,
    zip?: string | null,
    country?: string | null,
    address1?: string | null,
    address2?: string | null,
    deliveryPerson?: string | null,
    deliveryEmail?: string | null,
    deliveryAddress1?: string | null,
    deliveryAddress2?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMemberMutationVariables = {
  input: UpdateMemberInput,
  condition?: ModelMemberConditionInput | null,
};

export type UpdateMemberMutation = {
  updateMember?:  {
    __typename: "Member",
    id: string,
    name: string,
    email: string,
    phone?: string | null,
    active: boolean,
    province?: string | null,
    city?: string | null,
    zip?: string | null,
    country?: string | null,
    address1?: string | null,
    address2?: string | null,
    deliveryPerson?: string | null,
    deliveryEmail?: string | null,
    deliveryAddress1?: string | null,
    deliveryAddress2?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMemberMutationVariables = {
  input: DeleteMemberInput,
  condition?: ModelMemberConditionInput | null,
};

export type DeleteMemberMutation = {
  deleteMember?:  {
    __typename: "Member",
    id: string,
    name: string,
    email: string,
    phone?: string | null,
    active: boolean,
    province?: string | null,
    city?: string | null,
    zip?: string | null,
    country?: string | null,
    address1?: string | null,
    address2?: string | null,
    deliveryPerson?: string | null,
    deliveryEmail?: string | null,
    deliveryAddress1?: string | null,
    deliveryAddress2?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetOrderQueryVariables = {
  id: string,
};

export type GetOrderQuery = {
  getOrder?:  {
    __typename: "Order",
    id: string,
    orderNumber: string,
    orderDate: string,
    orderValue: number,
    products: string,
    deliveryDetails: string,
    status: OrderStatus,
    trackingStatus?: string | null,
    trackingNumber?: string | null,
    packagingType: PackagingType,
    memberId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListOrdersQueryVariables = {
  filter?: ModelOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOrdersQuery = {
  listOrders?:  {
    __typename: "ModelOrderConnection",
    items:  Array< {
      __typename: "Order",
      id: string,
      orderNumber: string,
      orderDate: string,
      orderValue: number,
      products: string,
      deliveryDetails: string,
      status: OrderStatus,
      trackingStatus?: string | null,
      trackingNumber?: string | null,
      packagingType: PackagingType,
      memberId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetProductQueryVariables = {
  id: string,
};

export type GetProductQuery = {
  getProduct?:  {
    __typename: "Product",
    id: string,
    title?: string | null,
    body?: string | null,
    variants?: string | null,
    quantity?: number | null,
    category?: string | null,
    price?: number | null,
    taxable?: boolean | null,
    published?: boolean | null,
    featuredImage?: string | null,
    otherImages?: Array< string | null > | null,
    size?: string | null,
    available?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListProductsQueryVariables = {
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductsQuery = {
  listProducts?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      title?: string | null,
      body?: string | null,
      variants?: string | null,
      quantity?: number | null,
      category?: string | null,
      price?: number | null,
      taxable?: boolean | null,
      published?: boolean | null,
      featuredImage?: string | null,
      otherImages?: Array< string | null > | null,
      size?: string | null,
      available?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMemberQueryVariables = {
  id: string,
};

export type GetMemberQuery = {
  getMember?:  {
    __typename: "Member",
    id: string,
    name: string,
    email: string,
    phone?: string | null,
    active: boolean,
    province?: string | null,
    city?: string | null,
    zip?: string | null,
    country?: string | null,
    address1?: string | null,
    address2?: string | null,
    deliveryPerson?: string | null,
    deliveryEmail?: string | null,
    deliveryAddress1?: string | null,
    deliveryAddress2?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMembersQueryVariables = {
  filter?: ModelMemberFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMembersQuery = {
  listMembers?:  {
    __typename: "ModelMemberConnection",
    items:  Array< {
      __typename: "Member",
      id: string,
      name: string,
      email: string,
      phone?: string | null,
      active: boolean,
      province?: string | null,
      city?: string | null,
      zip?: string | null,
      country?: string | null,
      address1?: string | null,
      address2?: string | null,
      deliveryPerson?: string | null,
      deliveryEmail?: string | null,
      deliveryAddress1?: string | null,
      deliveryAddress2?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateOrderSubscriptionVariables = {
  filter?: ModelSubscriptionOrderFilterInput | null,
};

export type OnCreateOrderSubscription = {
  onCreateOrder?:  {
    __typename: "Order",
    id: string,
    orderNumber: string,
    orderDate: string,
    orderValue: number,
    products: string,
    deliveryDetails: string,
    status: OrderStatus,
    trackingStatus?: string | null,
    trackingNumber?: string | null,
    packagingType: PackagingType,
    memberId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateOrderSubscriptionVariables = {
  filter?: ModelSubscriptionOrderFilterInput | null,
};

export type OnUpdateOrderSubscription = {
  onUpdateOrder?:  {
    __typename: "Order",
    id: string,
    orderNumber: string,
    orderDate: string,
    orderValue: number,
    products: string,
    deliveryDetails: string,
    status: OrderStatus,
    trackingStatus?: string | null,
    trackingNumber?: string | null,
    packagingType: PackagingType,
    memberId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteOrderSubscriptionVariables = {
  filter?: ModelSubscriptionOrderFilterInput | null,
};

export type OnDeleteOrderSubscription = {
  onDeleteOrder?:  {
    __typename: "Order",
    id: string,
    orderNumber: string,
    orderDate: string,
    orderValue: number,
    products: string,
    deliveryDetails: string,
    status: OrderStatus,
    trackingStatus?: string | null,
    trackingNumber?: string | null,
    packagingType: PackagingType,
    memberId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
};

export type OnCreateProductSubscription = {
  onCreateProduct?:  {
    __typename: "Product",
    id: string,
    title?: string | null,
    body?: string | null,
    variants?: string | null,
    quantity?: number | null,
    category?: string | null,
    price?: number | null,
    taxable?: boolean | null,
    published?: boolean | null,
    featuredImage?: string | null,
    otherImages?: Array< string | null > | null,
    size?: string | null,
    available?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
};

export type OnUpdateProductSubscription = {
  onUpdateProduct?:  {
    __typename: "Product",
    id: string,
    title?: string | null,
    body?: string | null,
    variants?: string | null,
    quantity?: number | null,
    category?: string | null,
    price?: number | null,
    taxable?: boolean | null,
    published?: boolean | null,
    featuredImage?: string | null,
    otherImages?: Array< string | null > | null,
    size?: string | null,
    available?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
};

export type OnDeleteProductSubscription = {
  onDeleteProduct?:  {
    __typename: "Product",
    id: string,
    title?: string | null,
    body?: string | null,
    variants?: string | null,
    quantity?: number | null,
    category?: string | null,
    price?: number | null,
    taxable?: boolean | null,
    published?: boolean | null,
    featuredImage?: string | null,
    otherImages?: Array< string | null > | null,
    size?: string | null,
    available?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMemberSubscriptionVariables = {
  filter?: ModelSubscriptionMemberFilterInput | null,
};

export type OnCreateMemberSubscription = {
  onCreateMember?:  {
    __typename: "Member",
    id: string,
    name: string,
    email: string,
    phone?: string | null,
    active: boolean,
    province?: string | null,
    city?: string | null,
    zip?: string | null,
    country?: string | null,
    address1?: string | null,
    address2?: string | null,
    deliveryPerson?: string | null,
    deliveryEmail?: string | null,
    deliveryAddress1?: string | null,
    deliveryAddress2?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMemberSubscriptionVariables = {
  filter?: ModelSubscriptionMemberFilterInput | null,
};

export type OnUpdateMemberSubscription = {
  onUpdateMember?:  {
    __typename: "Member",
    id: string,
    name: string,
    email: string,
    phone?: string | null,
    active: boolean,
    province?: string | null,
    city?: string | null,
    zip?: string | null,
    country?: string | null,
    address1?: string | null,
    address2?: string | null,
    deliveryPerson?: string | null,
    deliveryEmail?: string | null,
    deliveryAddress1?: string | null,
    deliveryAddress2?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMemberSubscriptionVariables = {
  filter?: ModelSubscriptionMemberFilterInput | null,
};

export type OnDeleteMemberSubscription = {
  onDeleteMember?:  {
    __typename: "Member",
    id: string,
    name: string,
    email: string,
    phone?: string | null,
    active: boolean,
    province?: string | null,
    city?: string | null,
    zip?: string | null,
    country?: string | null,
    address1?: string | null,
    address2?: string | null,
    deliveryPerson?: string | null,
    deliveryEmail?: string | null,
    deliveryAddress1?: string | null,
    deliveryAddress2?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
