/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import {
  GridProps,
  SelectFieldProps,
  TextFieldProps,
} from "@aws-amplify/ui-react";
import { Order } from "../lib/awsApis.js";
export declare type EscapeHatchProps = {
  [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
  [key: string]: string;
};
export declare type Variant = {
  variantValues: VariantValues;
  overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type OrderUpdateFormInputValues = {
  orderNumber?: string;
  orderDate?: string;
  orderValue?: number;
  products?: string;
  deliveryDetails?: string;
  status?: string;
  trackingStatus?: string;
  trackingNumber?: string;
};
export declare type OrderUpdateFormValidationValues = {
  orderNumber?: ValidationFunction<string>;
  orderDate?: ValidationFunction<string>;
  orderValue?: ValidationFunction<number>;
  products?: ValidationFunction<string>;
  deliveryDetails?: ValidationFunction<string>;
  status?: ValidationFunction<string>;
  trackingStatus?: ValidationFunction<string>;
  trackingNumber?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type OrderUpdateFormOverridesProps = {
  OrderUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  orderNumber?: PrimitiveOverrideProps<TextFieldProps>;
  orderDate?: PrimitiveOverrideProps<TextFieldProps>;
  orderValue?: PrimitiveOverrideProps<TextFieldProps>;
  products?: PrimitiveOverrideProps<TextFieldProps>;
  deliveryDetails?: PrimitiveOverrideProps<TextFieldProps>;
  status?: PrimitiveOverrideProps<SelectFieldProps>;
  trackingStatus?: PrimitiveOverrideProps<TextFieldProps>;
  trackingNumber?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type OrderUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: OrderUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    order?: Order;
    onSubmit?: (
      fields: OrderUpdateFormInputValues
    ) => OrderUpdateFormInputValues;
    onSuccess?: (fields: OrderUpdateFormInputValues) => void;
    onError?: (
      fields: OrderUpdateFormInputValues,
      errorMessage: string
    ) => void;
    onChange?: (
      fields: OrderUpdateFormInputValues
    ) => OrderUpdateFormInputValues;
    onValidate?: OrderUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function OrderUpdateForm(
  props: OrderUpdateFormProps
): React.ReactElement;
