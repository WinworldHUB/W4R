/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createOrder } from "../graphql/mutations";
const client = generateClient();
export default function OrderCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    orderNumber: "",
    orderDate: "",
    orderValue: "",
    products: "",
    deliveryDetails: "",
  };
  const [orderNumber, setOrderNumber] = React.useState(
    initialValues.orderNumber
  );
  const [orderDate, setOrderDate] = React.useState(initialValues.orderDate);
  const [orderValue, setOrderValue] = React.useState(initialValues.orderValue);
  const [products, setProducts] = React.useState(initialValues.products);
  const [deliveryDetails, setDeliveryDetails] = React.useState(
    initialValues.deliveryDetails
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setOrderNumber(initialValues.orderNumber);
    setOrderDate(initialValues.orderDate);
    setOrderValue(initialValues.orderValue);
    setProducts(initialValues.products);
    setDeliveryDetails(initialValues.deliveryDetails);
    setErrors({});
  };
  const validations = {
    orderNumber: [{ type: "Required" }],
    orderDate: [{ type: "Required" }],
    orderValue: [{ type: "Required" }],
    products: [{ type: "Required" }],
    deliveryDetails: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          orderNumber,
          orderDate,
          orderValue,
          products,
          deliveryDetails,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createOrder.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "OrderCreateForm")}
      {...rest}
    >
      <TextField
        label="Order number"
        isRequired={true}
        isReadOnly={false}
        value={orderNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              orderNumber: value,
              orderDate,
              orderValue,
              products,
              deliveryDetails,
            };
            const result = onChange(modelFields);
            value = result?.orderNumber ?? value;
          }
          if (errors.orderNumber?.hasError) {
            runValidationTasks("orderNumber", value);
          }
          setOrderNumber(value);
        }}
        onBlur={() => runValidationTasks("orderNumber", orderNumber)}
        errorMessage={errors.orderNumber?.errorMessage}
        hasError={errors.orderNumber?.hasError}
        {...getOverrideProps(overrides, "orderNumber")}
      ></TextField>
      <TextField
        label="Order date"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={orderDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              orderNumber,
              orderDate: value,
              orderValue,
              products,
              deliveryDetails,
            };
            const result = onChange(modelFields);
            value = result?.orderDate ?? value;
          }
          if (errors.orderDate?.hasError) {
            runValidationTasks("orderDate", value);
          }
          setOrderDate(value);
        }}
        onBlur={() => runValidationTasks("orderDate", orderDate)}
        errorMessage={errors.orderDate?.errorMessage}
        hasError={errors.orderDate?.hasError}
        {...getOverrideProps(overrides, "orderDate")}
      ></TextField>
      <TextField
        label="Order value"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={orderValue}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              orderNumber,
              orderDate,
              orderValue: value,
              products,
              deliveryDetails,
            };
            const result = onChange(modelFields);
            value = result?.orderValue ?? value;
          }
          if (errors.orderValue?.hasError) {
            runValidationTasks("orderValue", value);
          }
          setOrderValue(value);
        }}
        onBlur={() => runValidationTasks("orderValue", orderValue)}
        errorMessage={errors.orderValue?.errorMessage}
        hasError={errors.orderValue?.hasError}
        {...getOverrideProps(overrides, "orderValue")}
      ></TextField>
      <TextField
        label="Products"
        isRequired={true}
        isReadOnly={false}
        value={products}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              orderNumber,
              orderDate,
              orderValue,
              products: value,
              deliveryDetails,
            };
            const result = onChange(modelFields);
            value = result?.products ?? value;
          }
          if (errors.products?.hasError) {
            runValidationTasks("products", value);
          }
          setProducts(value);
        }}
        onBlur={() => runValidationTasks("products", products)}
        errorMessage={errors.products?.errorMessage}
        hasError={errors.products?.hasError}
        {...getOverrideProps(overrides, "products")}
      ></TextField>
      <TextField
        label="Delivery details"
        isRequired={true}
        isReadOnly={false}
        value={deliveryDetails}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              orderNumber,
              orderDate,
              orderValue,
              products,
              deliveryDetails: value,
            };
            const result = onChange(modelFields);
            value = result?.deliveryDetails ?? value;
          }
          if (errors.deliveryDetails?.hasError) {
            runValidationTasks("deliveryDetails", value);
          }
          setDeliveryDetails(value);
        }}
        onBlur={() => runValidationTasks("deliveryDetails", deliveryDetails)}
        errorMessage={errors.deliveryDetails?.errorMessage}
        hasError={errors.deliveryDetails?.hasError}
        {...getOverrideProps(overrides, "deliveryDetails")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
