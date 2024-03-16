/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createProduct } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function ProductCreateForm(props) {
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
    title: "",
    body: "",
    variants: "",
    quantity: "",
    category: "",
    price: "",
    taxable: false,
    published: false,
    featuredImage: "",
    otherImages: [],
    size: "",
    available: false,
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [body, setBody] = React.useState(initialValues.body);
  const [variants, setVariants] = React.useState(initialValues.variants);
  const [quantity, setQuantity] = React.useState(initialValues.quantity);
  const [category, setCategory] = React.useState(initialValues.category);
  const [price, setPrice] = React.useState(initialValues.price);
  const [taxable, setTaxable] = React.useState(initialValues.taxable);
  const [published, setPublished] = React.useState(initialValues.published);
  const [featuredImage, setFeaturedImage] = React.useState(
    initialValues.featuredImage
  );
  const [otherImages, setOtherImages] = React.useState(
    initialValues.otherImages
  );
  const [size, setSize] = React.useState(initialValues.size);
  const [available, setAvailable] = React.useState(initialValues.available);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTitle(initialValues.title);
    setBody(initialValues.body);
    setVariants(initialValues.variants);
    setQuantity(initialValues.quantity);
    setCategory(initialValues.category);
    setPrice(initialValues.price);
    setTaxable(initialValues.taxable);
    setPublished(initialValues.published);
    setFeaturedImage(initialValues.featuredImage);
    setOtherImages(initialValues.otherImages);
    setCurrentOtherImagesValue("");
    setSize(initialValues.size);
    setAvailable(initialValues.available);
    setErrors({});
  };
  const [currentOtherImagesValue, setCurrentOtherImagesValue] =
    React.useState("");
  const otherImagesRef = React.createRef();
  const validations = {
    title: [],
    body: [],
    variants: [],
    quantity: [],
    category: [],
    price: [],
    taxable: [],
    published: [],
    featuredImage: [],
    otherImages: [],
    size: [],
    available: [],
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
          title,
          body,
          variants,
          quantity,
          category,
          price,
          taxable,
          published,
          featuredImage,
          otherImages,
          size,
          available,
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
            query: createProduct.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "ProductCreateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={false}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              body,
              variants,
              quantity,
              category,
              price,
              taxable,
              published,
              featuredImage,
              otherImages,
              size,
              available,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Body"
        isRequired={false}
        isReadOnly={false}
        value={body}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              body: value,
              variants,
              quantity,
              category,
              price,
              taxable,
              published,
              featuredImage,
              otherImages,
              size,
              available,
            };
            const result = onChange(modelFields);
            value = result?.body ?? value;
          }
          if (errors.body?.hasError) {
            runValidationTasks("body", value);
          }
          setBody(value);
        }}
        onBlur={() => runValidationTasks("body", body)}
        errorMessage={errors.body?.errorMessage}
        hasError={errors.body?.hasError}
        {...getOverrideProps(overrides, "body")}
      ></TextField>
      <TextField
        label="Variants"
        isRequired={false}
        isReadOnly={false}
        value={variants}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              body,
              variants: value,
              quantity,
              category,
              price,
              taxable,
              published,
              featuredImage,
              otherImages,
              size,
              available,
            };
            const result = onChange(modelFields);
            value = result?.variants ?? value;
          }
          if (errors.variants?.hasError) {
            runValidationTasks("variants", value);
          }
          setVariants(value);
        }}
        onBlur={() => runValidationTasks("variants", variants)}
        errorMessage={errors.variants?.errorMessage}
        hasError={errors.variants?.hasError}
        {...getOverrideProps(overrides, "variants")}
      ></TextField>
      <TextField
        label="Quantity"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={quantity}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              body,
              variants,
              quantity: value,
              category,
              price,
              taxable,
              published,
              featuredImage,
              otherImages,
              size,
              available,
            };
            const result = onChange(modelFields);
            value = result?.quantity ?? value;
          }
          if (errors.quantity?.hasError) {
            runValidationTasks("quantity", value);
          }
          setQuantity(value);
        }}
        onBlur={() => runValidationTasks("quantity", quantity)}
        errorMessage={errors.quantity?.errorMessage}
        hasError={errors.quantity?.hasError}
        {...getOverrideProps(overrides, "quantity")}
      ></TextField>
      <TextField
        label="Category"
        isRequired={false}
        isReadOnly={false}
        value={category}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              body,
              variants,
              quantity,
              category: value,
              price,
              taxable,
              published,
              featuredImage,
              otherImages,
              size,
              available,
            };
            const result = onChange(modelFields);
            value = result?.category ?? value;
          }
          if (errors.category?.hasError) {
            runValidationTasks("category", value);
          }
          setCategory(value);
        }}
        onBlur={() => runValidationTasks("category", category)}
        errorMessage={errors.category?.errorMessage}
        hasError={errors.category?.hasError}
        {...getOverrideProps(overrides, "category")}
      ></TextField>
      <TextField
        label="Price"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={price}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              body,
              variants,
              quantity,
              category,
              price: value,
              taxable,
              published,
              featuredImage,
              otherImages,
              size,
              available,
            };
            const result = onChange(modelFields);
            value = result?.price ?? value;
          }
          if (errors.price?.hasError) {
            runValidationTasks("price", value);
          }
          setPrice(value);
        }}
        onBlur={() => runValidationTasks("price", price)}
        errorMessage={errors.price?.errorMessage}
        hasError={errors.price?.hasError}
        {...getOverrideProps(overrides, "price")}
      ></TextField>
      <SwitchField
        label="Taxable"
        defaultChecked={false}
        isDisabled={false}
        isChecked={taxable}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              title,
              body,
              variants,
              quantity,
              category,
              price,
              taxable: value,
              published,
              featuredImage,
              otherImages,
              size,
              available,
            };
            const result = onChange(modelFields);
            value = result?.taxable ?? value;
          }
          if (errors.taxable?.hasError) {
            runValidationTasks("taxable", value);
          }
          setTaxable(value);
        }}
        onBlur={() => runValidationTasks("taxable", taxable)}
        errorMessage={errors.taxable?.errorMessage}
        hasError={errors.taxable?.hasError}
        {...getOverrideProps(overrides, "taxable")}
      ></SwitchField>
      <SwitchField
        label="Published"
        defaultChecked={false}
        isDisabled={false}
        isChecked={published}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              title,
              body,
              variants,
              quantity,
              category,
              price,
              taxable,
              published: value,
              featuredImage,
              otherImages,
              size,
              available,
            };
            const result = onChange(modelFields);
            value = result?.published ?? value;
          }
          if (errors.published?.hasError) {
            runValidationTasks("published", value);
          }
          setPublished(value);
        }}
        onBlur={() => runValidationTasks("published", published)}
        errorMessage={errors.published?.errorMessage}
        hasError={errors.published?.hasError}
        {...getOverrideProps(overrides, "published")}
      ></SwitchField>
      <TextField
        label="Featured image"
        isRequired={false}
        isReadOnly={false}
        value={featuredImage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              body,
              variants,
              quantity,
              category,
              price,
              taxable,
              published,
              featuredImage: value,
              otherImages,
              size,
              available,
            };
            const result = onChange(modelFields);
            value = result?.featuredImage ?? value;
          }
          if (errors.featuredImage?.hasError) {
            runValidationTasks("featuredImage", value);
          }
          setFeaturedImage(value);
        }}
        onBlur={() => runValidationTasks("featuredImage", featuredImage)}
        errorMessage={errors.featuredImage?.errorMessage}
        hasError={errors.featuredImage?.hasError}
        {...getOverrideProps(overrides, "featuredImage")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              body,
              variants,
              quantity,
              category,
              price,
              taxable,
              published,
              featuredImage,
              otherImages: values,
              size,
              available,
            };
            const result = onChange(modelFields);
            values = result?.otherImages ?? values;
          }
          setOtherImages(values);
          setCurrentOtherImagesValue("");
        }}
        currentFieldValue={currentOtherImagesValue}
        label={"Other images"}
        items={otherImages}
        hasError={errors?.otherImages?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("otherImages", currentOtherImagesValue)
        }
        errorMessage={errors?.otherImages?.errorMessage}
        setFieldValue={setCurrentOtherImagesValue}
        inputFieldRef={otherImagesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Other images"
          isRequired={false}
          isReadOnly={false}
          value={currentOtherImagesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.otherImages?.hasError) {
              runValidationTasks("otherImages", value);
            }
            setCurrentOtherImagesValue(value);
          }}
          onBlur={() =>
            runValidationTasks("otherImages", currentOtherImagesValue)
          }
          errorMessage={errors.otherImages?.errorMessage}
          hasError={errors.otherImages?.hasError}
          ref={otherImagesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "otherImages")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Size"
        isRequired={false}
        isReadOnly={false}
        value={size}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              body,
              variants,
              quantity,
              category,
              price,
              taxable,
              published,
              featuredImage,
              otherImages,
              size: value,
              available,
            };
            const result = onChange(modelFields);
            value = result?.size ?? value;
          }
          if (errors.size?.hasError) {
            runValidationTasks("size", value);
          }
          setSize(value);
        }}
        onBlur={() => runValidationTasks("size", size)}
        errorMessage={errors.size?.errorMessage}
        hasError={errors.size?.hasError}
        {...getOverrideProps(overrides, "size")}
      ></TextField>
      <SwitchField
        label="Available"
        defaultChecked={false}
        isDisabled={false}
        isChecked={available}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              title,
              body,
              variants,
              quantity,
              category,
              price,
              taxable,
              published,
              featuredImage,
              otherImages,
              size,
              available: value,
            };
            const result = onChange(modelFields);
            value = result?.available ?? value;
          }
          if (errors.available?.hasError) {
            runValidationTasks("available", value);
          }
          setAvailable(value);
        }}
        onBlur={() => runValidationTasks("available", available)}
        errorMessage={errors.available?.errorMessage}
        hasError={errors.available?.hasError}
        {...getOverrideProps(overrides, "available")}
      ></SwitchField>
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
