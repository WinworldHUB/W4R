/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getMember } from "../graphql/queries";
import { updateMember } from "../graphql/mutations";
const client = generateClient();
export default function MemberUpdateForm(props) {
  const {
    id: idProp,
    member: memberModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    active: false,
    province: "",
    city: "",
    zip: "",
    country: "",
    address1: "",
    address2: "",
    deliveryPerson: "",
    deliveryEmail: "",
    deliveryAddress1: "",
    deliveryAddress2: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [active, setActive] = React.useState(initialValues.active);
  const [province, setProvince] = React.useState(initialValues.province);
  const [city, setCity] = React.useState(initialValues.city);
  const [zip, setZip] = React.useState(initialValues.zip);
  const [country, setCountry] = React.useState(initialValues.country);
  const [address1, setAddress1] = React.useState(initialValues.address1);
  const [address2, setAddress2] = React.useState(initialValues.address2);
  const [deliveryPerson, setDeliveryPerson] = React.useState(
    initialValues.deliveryPerson
  );
  const [deliveryEmail, setDeliveryEmail] = React.useState(
    initialValues.deliveryEmail
  );
  const [deliveryAddress1, setDeliveryAddress1] = React.useState(
    initialValues.deliveryAddress1
  );
  const [deliveryAddress2, setDeliveryAddress2] = React.useState(
    initialValues.deliveryAddress2
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = memberRecord
      ? { ...initialValues, ...memberRecord }
      : initialValues;
    setName(cleanValues.name);
    setEmail(cleanValues.email);
    setPhone(cleanValues.phone);
    setActive(cleanValues.active);
    setProvince(cleanValues.province);
    setCity(cleanValues.city);
    setZip(cleanValues.zip);
    setCountry(cleanValues.country);
    setAddress1(cleanValues.address1);
    setAddress2(cleanValues.address2);
    setDeliveryPerson(cleanValues.deliveryPerson);
    setDeliveryEmail(cleanValues.deliveryEmail);
    setDeliveryAddress1(cleanValues.deliveryAddress1);
    setDeliveryAddress2(cleanValues.deliveryAddress2);
    setErrors({});
  };
  const [memberRecord, setMemberRecord] = React.useState(memberModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getMember.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getMember
        : memberModelProp;
      setMemberRecord(record);
    };
    queryData();
  }, [idProp, memberModelProp]);
  React.useEffect(resetStateValues, [memberRecord]);
  const validations = {
    name: [{ type: "Required" }],
    email: [{ type: "Required" }],
    phone: [],
    active: [{ type: "Required" }],
    province: [],
    city: [],
    zip: [],
    country: [],
    address1: [],
    address2: [],
    deliveryPerson: [],
    deliveryEmail: [],
    deliveryAddress1: [],
    deliveryAddress2: [],
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
          name,
          email,
          phone: phone ?? null,
          active,
          province: province ?? null,
          city: city ?? null,
          zip: zip ?? null,
          country: country ?? null,
          address1: address1 ?? null,
          address2: address2 ?? null,
          deliveryPerson: deliveryPerson ?? null,
          deliveryEmail: deliveryEmail ?? null,
          deliveryAddress1: deliveryAddress1 ?? null,
          deliveryAddress2: deliveryAddress2 ?? null,
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
            query: updateMember.replaceAll("__typename", ""),
            variables: {
              input: {
                id: memberRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MemberUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              email,
              phone,
              active,
              province,
              city,
              zip,
              country,
              address1,
              address2,
              deliveryPerson,
              deliveryEmail,
              deliveryAddress1,
              deliveryAddress2,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email: value,
              phone,
              active,
              province,
              city,
              zip,
              country,
              address1,
              address2,
              deliveryPerson,
              deliveryEmail,
              deliveryAddress1,
              deliveryAddress2,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Phone"
        isRequired={false}
        isReadOnly={false}
        value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              phone: value,
              active,
              province,
              city,
              zip,
              country,
              address1,
              address2,
              deliveryPerson,
              deliveryEmail,
              deliveryAddress1,
              deliveryAddress2,
            };
            const result = onChange(modelFields);
            value = result?.phone ?? value;
          }
          if (errors.phone?.hasError) {
            runValidationTasks("phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("phone", phone)}
        errorMessage={errors.phone?.errorMessage}
        hasError={errors.phone?.hasError}
        {...getOverrideProps(overrides, "phone")}
      ></TextField>
      <SwitchField
        label="Active"
        defaultChecked={false}
        isDisabled={false}
        isChecked={active}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              email,
              phone,
              active: value,
              province,
              city,
              zip,
              country,
              address1,
              address2,
              deliveryPerson,
              deliveryEmail,
              deliveryAddress1,
              deliveryAddress2,
            };
            const result = onChange(modelFields);
            value = result?.active ?? value;
          }
          if (errors.active?.hasError) {
            runValidationTasks("active", value);
          }
          setActive(value);
        }}
        onBlur={() => runValidationTasks("active", active)}
        errorMessage={errors.active?.errorMessage}
        hasError={errors.active?.hasError}
        {...getOverrideProps(overrides, "active")}
      ></SwitchField>
      <TextField
        label="Province"
        isRequired={false}
        isReadOnly={false}
        value={province}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              phone,
              active,
              province: value,
              city,
              zip,
              country,
              address1,
              address2,
              deliveryPerson,
              deliveryEmail,
              deliveryAddress1,
              deliveryAddress2,
            };
            const result = onChange(modelFields);
            value = result?.province ?? value;
          }
          if (errors.province?.hasError) {
            runValidationTasks("province", value);
          }
          setProvince(value);
        }}
        onBlur={() => runValidationTasks("province", province)}
        errorMessage={errors.province?.errorMessage}
        hasError={errors.province?.hasError}
        {...getOverrideProps(overrides, "province")}
      ></TextField>
      <TextField
        label="City"
        isRequired={false}
        isReadOnly={false}
        value={city}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              phone,
              active,
              province,
              city: value,
              zip,
              country,
              address1,
              address2,
              deliveryPerson,
              deliveryEmail,
              deliveryAddress1,
              deliveryAddress2,
            };
            const result = onChange(modelFields);
            value = result?.city ?? value;
          }
          if (errors.city?.hasError) {
            runValidationTasks("city", value);
          }
          setCity(value);
        }}
        onBlur={() => runValidationTasks("city", city)}
        errorMessage={errors.city?.errorMessage}
        hasError={errors.city?.hasError}
        {...getOverrideProps(overrides, "city")}
      ></TextField>
      <TextField
        label="Zip"
        isRequired={false}
        isReadOnly={false}
        value={zip}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              phone,
              active,
              province,
              city,
              zip: value,
              country,
              address1,
              address2,
              deliveryPerson,
              deliveryEmail,
              deliveryAddress1,
              deliveryAddress2,
            };
            const result = onChange(modelFields);
            value = result?.zip ?? value;
          }
          if (errors.zip?.hasError) {
            runValidationTasks("zip", value);
          }
          setZip(value);
        }}
        onBlur={() => runValidationTasks("zip", zip)}
        errorMessage={errors.zip?.errorMessage}
        hasError={errors.zip?.hasError}
        {...getOverrideProps(overrides, "zip")}
      ></TextField>
      <TextField
        label="Country"
        isRequired={false}
        isReadOnly={false}
        value={country}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              phone,
              active,
              province,
              city,
              zip,
              country: value,
              address1,
              address2,
              deliveryPerson,
              deliveryEmail,
              deliveryAddress1,
              deliveryAddress2,
            };
            const result = onChange(modelFields);
            value = result?.country ?? value;
          }
          if (errors.country?.hasError) {
            runValidationTasks("country", value);
          }
          setCountry(value);
        }}
        onBlur={() => runValidationTasks("country", country)}
        errorMessage={errors.country?.errorMessage}
        hasError={errors.country?.hasError}
        {...getOverrideProps(overrides, "country")}
      ></TextField>
      <TextField
        label="Address1"
        isRequired={false}
        isReadOnly={false}
        value={address1}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              phone,
              active,
              province,
              city,
              zip,
              country,
              address1: value,
              address2,
              deliveryPerson,
              deliveryEmail,
              deliveryAddress1,
              deliveryAddress2,
            };
            const result = onChange(modelFields);
            value = result?.address1 ?? value;
          }
          if (errors.address1?.hasError) {
            runValidationTasks("address1", value);
          }
          setAddress1(value);
        }}
        onBlur={() => runValidationTasks("address1", address1)}
        errorMessage={errors.address1?.errorMessage}
        hasError={errors.address1?.hasError}
        {...getOverrideProps(overrides, "address1")}
      ></TextField>
      <TextField
        label="Address2"
        isRequired={false}
        isReadOnly={false}
        value={address2}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              phone,
              active,
              province,
              city,
              zip,
              country,
              address1,
              address2: value,
              deliveryPerson,
              deliveryEmail,
              deliveryAddress1,
              deliveryAddress2,
            };
            const result = onChange(modelFields);
            value = result?.address2 ?? value;
          }
          if (errors.address2?.hasError) {
            runValidationTasks("address2", value);
          }
          setAddress2(value);
        }}
        onBlur={() => runValidationTasks("address2", address2)}
        errorMessage={errors.address2?.errorMessage}
        hasError={errors.address2?.hasError}
        {...getOverrideProps(overrides, "address2")}
      ></TextField>
      <TextField
        label="Delivery person"
        isRequired={false}
        isReadOnly={false}
        value={deliveryPerson}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              phone,
              active,
              province,
              city,
              zip,
              country,
              address1,
              address2,
              deliveryPerson: value,
              deliveryEmail,
              deliveryAddress1,
              deliveryAddress2,
            };
            const result = onChange(modelFields);
            value = result?.deliveryPerson ?? value;
          }
          if (errors.deliveryPerson?.hasError) {
            runValidationTasks("deliveryPerson", value);
          }
          setDeliveryPerson(value);
        }}
        onBlur={() => runValidationTasks("deliveryPerson", deliveryPerson)}
        errorMessage={errors.deliveryPerson?.errorMessage}
        hasError={errors.deliveryPerson?.hasError}
        {...getOverrideProps(overrides, "deliveryPerson")}
      ></TextField>
      <TextField
        label="Delivery email"
        isRequired={false}
        isReadOnly={false}
        value={deliveryEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              phone,
              active,
              province,
              city,
              zip,
              country,
              address1,
              address2,
              deliveryPerson,
              deliveryEmail: value,
              deliveryAddress1,
              deliveryAddress2,
            };
            const result = onChange(modelFields);
            value = result?.deliveryEmail ?? value;
          }
          if (errors.deliveryEmail?.hasError) {
            runValidationTasks("deliveryEmail", value);
          }
          setDeliveryEmail(value);
        }}
        onBlur={() => runValidationTasks("deliveryEmail", deliveryEmail)}
        errorMessage={errors.deliveryEmail?.errorMessage}
        hasError={errors.deliveryEmail?.hasError}
        {...getOverrideProps(overrides, "deliveryEmail")}
      ></TextField>
      <TextField
        label="Delivery address1"
        isRequired={false}
        isReadOnly={false}
        value={deliveryAddress1}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              phone,
              active,
              province,
              city,
              zip,
              country,
              address1,
              address2,
              deliveryPerson,
              deliveryEmail,
              deliveryAddress1: value,
              deliveryAddress2,
            };
            const result = onChange(modelFields);
            value = result?.deliveryAddress1 ?? value;
          }
          if (errors.deliveryAddress1?.hasError) {
            runValidationTasks("deliveryAddress1", value);
          }
          setDeliveryAddress1(value);
        }}
        onBlur={() => runValidationTasks("deliveryAddress1", deliveryAddress1)}
        errorMessage={errors.deliveryAddress1?.errorMessage}
        hasError={errors.deliveryAddress1?.hasError}
        {...getOverrideProps(overrides, "deliveryAddress1")}
      ></TextField>
      <TextField
        label="Delivery address2"
        isRequired={false}
        isReadOnly={false}
        value={deliveryAddress2}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              email,
              phone,
              active,
              province,
              city,
              zip,
              country,
              address1,
              address2,
              deliveryPerson,
              deliveryEmail,
              deliveryAddress1,
              deliveryAddress2: value,
            };
            const result = onChange(modelFields);
            value = result?.deliveryAddress2 ?? value;
          }
          if (errors.deliveryAddress2?.hasError) {
            runValidationTasks("deliveryAddress2", value);
          }
          setDeliveryAddress2(value);
        }}
        onBlur={() => runValidationTasks("deliveryAddress2", deliveryAddress2)}
        errorMessage={errors.deliveryAddress2?.errorMessage}
        hasError={errors.deliveryAddress2?.hasError}
        {...getOverrideProps(overrides, "deliveryAddress2")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || memberModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || memberModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
