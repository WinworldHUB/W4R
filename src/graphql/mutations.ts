/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../lib/awsApis";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createInvoice = /* GraphQL */ `mutation CreateInvoice(
  $input: CreateInvoiceInput!
  $condition: ModelInvoiceConditionInput
) {
  createInvoice(input: $input, condition: $condition) {
    id
    orderId
    invoiceDate
    paymentDate
    memberId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateInvoiceMutationVariables,
  APITypes.CreateInvoiceMutation
>;
export const updateInvoice = /* GraphQL */ `mutation UpdateInvoice(
  $input: UpdateInvoiceInput!
  $condition: ModelInvoiceConditionInput
) {
  updateInvoice(input: $input, condition: $condition) {
    id
    orderId
    invoiceDate
    paymentDate
    memberId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateInvoiceMutationVariables,
  APITypes.UpdateInvoiceMutation
>;
export const deleteInvoice = /* GraphQL */ `mutation DeleteInvoice(
  $input: DeleteInvoiceInput!
  $condition: ModelInvoiceConditionInput
) {
  deleteInvoice(input: $input, condition: $condition) {
    id
    orderId
    invoiceDate
    paymentDate
    memberId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteInvoiceMutationVariables,
  APITypes.DeleteInvoiceMutation
>;
export const createOrder = /* GraphQL */ `mutation CreateOrder(
  $input: CreateOrderInput!
  $condition: ModelOrderConditionInput
) {
  createOrder(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateOrderMutationVariables,
  APITypes.CreateOrderMutation
>;
export const updateOrder = /* GraphQL */ `mutation UpdateOrder(
  $input: UpdateOrderInput!
  $condition: ModelOrderConditionInput
) {
  updateOrder(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateOrderMutationVariables,
  APITypes.UpdateOrderMutation
>;
export const deleteOrder = /* GraphQL */ `mutation DeleteOrder(
  $input: DeleteOrderInput!
  $condition: ModelOrderConditionInput
) {
  deleteOrder(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteOrderMutationVariables,
  APITypes.DeleteOrderMutation
>;
export const createProduct = /* GraphQL */ `mutation CreateProduct(
  $input: CreateProductInput!
  $condition: ModelProductConditionInput
) {
  createProduct(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateProductMutationVariables,
  APITypes.CreateProductMutation
>;
export const updateProduct = /* GraphQL */ `mutation UpdateProduct(
  $input: UpdateProductInput!
  $condition: ModelProductConditionInput
) {
  updateProduct(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateProductMutationVariables,
  APITypes.UpdateProductMutation
>;
export const deleteProduct = /* GraphQL */ `mutation DeleteProduct(
  $input: DeleteProductInput!
  $condition: ModelProductConditionInput
) {
  deleteProduct(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteProductMutationVariables,
  APITypes.DeleteProductMutation
>;
export const createMember = /* GraphQL */ `mutation CreateMember(
  $input: CreateMemberInput!
  $condition: ModelMemberConditionInput
) {
  createMember(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateMemberMutationVariables,
  APITypes.CreateMemberMutation
>;
export const updateMember = /* GraphQL */ `mutation UpdateMember(
  $input: UpdateMemberInput!
  $condition: ModelMemberConditionInput
) {
  updateMember(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateMemberMutationVariables,
  APITypes.UpdateMemberMutation
>;
export const deleteMember = /* GraphQL */ `mutation DeleteMember(
  $input: DeleteMemberInput!
  $condition: ModelMemberConditionInput
) {
  deleteMember(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteMemberMutationVariables,
  APITypes.DeleteMemberMutation
>;
