import React, {
  useImperativeHandle,
  forwardRef,
  useEffect,
  useState,
} from "react";
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

const CustomFieldArray = ({ heading, fields, name }, ref) => {
  const [initialValues, setInitialValue] = useState({ values: [] });

  let form = null;

  useImperativeHandle(
    ref,
    () => {
      return {
        getValues: () => form,
      };
    },
    []
  );

  useEffect(() => {
    let temp = {};
    fields.forEach((field) => (temp = { ...temp, [field.name]: "" }));

    setInitialValue({
      values: [{ ...temp }],
    });
  }, []);

  return (
    <Formik initialValues={initialValues} enableReinitialize>
      {(props) => {
        form = props;
        return (
          <>
            <FieldArray name="values">
              {({ push, pop, form }) => {
                const values = form.values.values;
                return (
                  <>
                    <div
                      style={{
                        marginBottom: "30px",
                        display: "flex",
                        gap: "10px",
                        justifyContent: "flex-end",
                      }}
                    >
                      <CustomButton
                        text="Add Another"
                        onClick={() => push({ name: "", phone: "" })}
                        classNames="text-light"
                        style={{backgroundColor: '#22A19A' }}
                      />
                    </div>
                    {
                      values.map((el, i) => (
                        <>
                          <div style={{ display: "flex", gap: "10px" }}>
                            {fields.map((field) => {
                              return (
                                <CustomInput
                                  label={field.label}
                                  selectValues={field.selectValues}
                                  value={values[i][field.name]}
                                  onChange={(e) => {
                                    form.setFieldValue(
                                      `values[${i}][${field.name}]`,
                                      e
                                    );
                                    let obj = null;
                                    if (field.fetchFrom) {
                                      obj = field.fetchFrom.find(
                                        (material) => material._id === e
                                      );
                                    }
      
                                    if (field.onChangeEffectOn) {
                                      field.onChangeEffectOn.forEach((el) => {
                                        const from = el.from.split(".");
                                        console.log(from);
                                        let value = obj;
                                        console.log(value);
                                        from.forEach((el2) => {
                                          value = value[el2];
                                        });
                                        form.setFieldValue(
                                          `values[${i}]${el.to}`,
                                          value
                                        );
                                      });
                                    }
                                  }}
                                />
                              );
                            })}
                          </div>
                            <div
                              style={{
                                marginTop: "10px",
                                marginBottom: "10px",
                                display: "flex",
                                gap: "10px",
                                justifyContent: "flex-end",
                              }}
                            >
                              <CustomButton size='small' classNames='bg-danger text-light' text="Delete" onClick={() => pop(i)} />
                            </div>
                        </>
                      ))
                    }

                  </>
                ) 
                
                
                
              }}
            </FieldArray>
          </>
        );
      }}
    </Formik>
  );
};

export default forwardRef(CustomFieldArray);
