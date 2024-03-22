/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../lib/awsApis";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateOrder = /* GraphQL */ `subscription OnCreateOrder($filter: ModelSubscriptionOrderFilterInput) {
  onCreateOrder(filter: $filter) {
    id
    orderNumber
    orderDate
    orderValue
    products
    deliveryDetails
    status
    trackingStatus
    trackingNumber
    packagingType
    memberId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateOrderSubscriptionVariables,
  APITypes.OnCreateOrderSubscription
>;
export const onUpdateOrder = /* GraphQL */ `subscription OnUpdateOrder($filter: ModelSubscriptionOrderFilterInput) {
  onUpdateOrder(filter: $filter) {
    id
    orderNumber
    orderDate
    orderValue
    products
    deliveryDetails
    status
    trackingStatus
    trackingNumber
    packagingType
    memberId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateOrderSubscriptionVariables,
  APITypes.OnUpdateOrderSubscription
>;
export const onDeleteOrder = /* GraphQL */ `subscription OnDeleteOrder($filter: ModelSubscriptionOrderFilterInput) {
  onDeleteOrder(filter: $filter) {
    id
    orderNumber
    orderDate
    orderValue
    products
    deliveryDetails
    status
    trackingStatus
    trackingNumber
    packagingType
    memberId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteOrderSubscriptionVariables,
  APITypes.OnDeleteOrderSubscription
>;
export const onCreateProduct = /* GraphQL */ `subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
  onCreateProduct(filter: $filter) {
    id
    title
    body
    variants
    quantity
    category
    price
    taxable
    published
    featuredImage
    otherImages
    size
    available
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateProductSubscriptionVariables,
  APITypes.OnCreateProductSubscription
>;
export const onUpdateProduct = /* GraphQL */ `subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
  onUpdateProduct(filter: $filter) {
    id
    title
    body
    variants
    quantity
    category
    price
    taxable
    published
    featuredImage
    otherImages
    size
    available
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateProductSubscriptionVariables,
  APITypes.OnUpdateProductSubscription
>;
export const onDeleteProduct = /* GraphQL */ `subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
  onDeleteProduct(filter: $filter) {
    id
    title
    body
    variants
    quantity
    category
    price
    taxable
    published
    featuredImage
    otherImages
    size
    available
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteProductSubscriptionVariables,
  APITypes.OnDeleteProductSubscription
>;
export const onCreateMember = /* GraphQL */ `subscription OnCreateMember($filter: ModelSubscriptionMemberFilterInput) {
  onCreateMember(filter: $filter) {
    id
    name
    email
    phone
    active
    province
    city
    zip
    country
    address1
    address2
    deliveryPerson
    deliveryEmail
    deliveryAddress1
    deliveryAddress2
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMemberSubscriptionVariables,
  APITypes.OnCreateMemberSubscription
>;
export const onUpdateMember = /* GraphQL */ `subscription OnUpdateMember($filter: ModelSubscriptionMemberFilterInput) {
  onUpdateMember(filter: $filter) {
    id
    name
    email
    phone
    active
    province
    city
    zip
    country
    address1
    address2
    deliveryPerson
    deliveryEmail
    deliveryAddress1
    deliveryAddress2
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMemberSubscriptionVariables,
  APITypes.OnUpdateMemberSubscription
>;
export const onDeleteMember = /* GraphQL */ `subscription OnDeleteMember($filter: ModelSubscriptionMemberFilterInput) {
  onDeleteMember(filter: $filter) {
    id
    name
    email
    phone
    active
    province
    city
    zip
    country
    address1
    address2
    deliveryPerson
    deliveryEmail
    deliveryAddress1
    deliveryAddress2
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMemberSubscriptionVariables,
  APITypes.OnDeleteMemberSubscription
>;
