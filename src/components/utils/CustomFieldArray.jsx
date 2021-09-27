import React, { useImperativeHandle } from "react";
import { Formik, FieldArray } from "formik";
import CustomInput from "./CustomInput";
import CustomButton from "./Button";

const initialValues = {
  friends: [
    {
      name: "",
      phone: "",
    },
  ],
};

const CustomFieldArray = ({ heading, fields, name, ref }) => {
  let form = null;
  useImperativeHandle(ref, () => ({
      getValues: () => form
  }), []);
  return (
    <Formik initialValues={initialValues}>
      {(props) => {
          form = props
        return (
          <>
            <FieldArray name="friends">
              {({ push, remove, form }) => {
                const friends = form.values.friends;
                return friends.map((el, i) => (
                  <>
                    {fields.map((field) => (
                      <CustomInput
                        label={field.label}
                        selectValues={field.selectValues}
                      />
                    ))}
                    <CustomButton
                      text="Add"
                      onClick={() => push({ name: "", phone: "" })}
                    />
                    <CustomButton text="Delete" onClick={() => remove(i)} />
                  </>
                ));
              }}
            </FieldArray>
            <p>{JSON.stringify(props.values, 0, 1)}</p>
          </>
        );
      }}
    </Formik>
  );
};

export default CustomFieldArray;
