/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import {
  GridProps,
  SwitchFieldProps,
  TextFieldProps,
} from "@aws-amplify/ui-react";
import { Product } from "../lib/awsApis.js";
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
export declare type ProductUpdateFormInputValues = {
  id?: string;
  title?: string;
  body?: string;
  variants?: string;
  quantity?: number;
  category?: string;
  price?: number;
  taxable?: boolean;
  published?: boolean;
  featuredImage?: string;
  otherImages?: string[];
  size?: string;
  available?: boolean;
};
export declare type ProductUpdateFormValidationValues = {
  id?: ValidationFunction<string>;
  title?: ValidationFunction<string>;
  body?: ValidationFunction<string>;
  variants?: ValidationFunction<string>;
  quantity?: ValidationFunction<number>;
  category?: ValidationFunction<string>;
  price?: ValidationFunction<number>;
  taxable?: ValidationFunction<boolean>;
  published?: ValidationFunction<boolean>;
  featuredImage?: ValidationFunction<string>;
  otherImages?: ValidationFunction<string>;
  size?: ValidationFunction<string>;
  available?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type ProductUpdateFormOverridesProps = {
  ProductUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  id?: PrimitiveOverrideProps<TextFieldProps>;
  title?: PrimitiveOverrideProps<TextFieldProps>;
  body?: PrimitiveOverrideProps<TextFieldProps>;
  variants?: PrimitiveOverrideProps<TextFieldProps>;
  quantity?: PrimitiveOverrideProps<TextFieldProps>;
  category?: PrimitiveOverrideProps<TextFieldProps>;
  price?: PrimitiveOverrideProps<TextFieldProps>;
  taxable?: PrimitiveOverrideProps<SwitchFieldProps>;
  published?: PrimitiveOverrideProps<SwitchFieldProps>;
  featuredImage?: PrimitiveOverrideProps<TextFieldProps>;
  otherImages?: PrimitiveOverrideProps<TextFieldProps>;
  size?: PrimitiveOverrideProps<TextFieldProps>;
  available?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type ProductUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: ProductUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    product?: Product;
    onSubmit?: (
      fields: ProductUpdateFormInputValues
    ) => ProductUpdateFormInputValues;
    onSuccess?: (fields: ProductUpdateFormInputValues) => void;
    onError?: (
      fields: ProductUpdateFormInputValues,
      errorMessage: string
    ) => void;
    onChange?: (
      fields: ProductUpdateFormInputValues
    ) => ProductUpdateFormInputValues;
    onValidate?: ProductUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function ProductUpdateForm(
  props: ProductUpdateFormProps
): React.ReactElement;
