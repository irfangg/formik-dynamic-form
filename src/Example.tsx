import React, { useEffect, useState } from "react";
import {
  Field,
  Form,
  Formik,
  FormikProps,
  useField,
  useFormik,
  useFormikContext
} from "formik";

const MyInput = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};

const MoreFields = () => {
  const {
    values: { sel, address },
    touched,
    setFieldValue
  } = useFormikContext();
  console.log("address ", address && Object.keys(address));
  React.useEffect(() => {
    // set the value of textC, based on textA and textB
    if (sel == 2) {
      setFieldValue("company.name", `irfan`);
    }
    if (sel == 1) {
      setFieldValue("company.name", `gg`);
    }
  }, [sel, setFieldValue]);
  return (
    <>
      <Field name="email" placeholder="Email" />
      <Field name="phone" placeholder="Email" />
      <Field name="company.name" placeholder="Email" />
      <Field name="company.catchPhrase" placeholder="catchPhrase" />
      {address &&
        Object.keys(address)?.map((key) => {
          return <Field name={address[key]} placeholder={key} />;
        })}
    </>
  );
};

const MyField = (props) => {
  const {
    values: { sel },
    touched,
    setFieldValue
  } = useFormikContext();
  // console.log('values ',values)
  const [field, meta] = useField(props);
  React.useEffect(() => {
    // set the value of textC, based on textA and textB
    if (sel) {
      setFieldValue(props.name, `textA:${sel}`);
    }
  }, [sel, setFieldValue, props.name]);

  return (
    <>
      {sel !== "" && <input {...props} {...field} />}
      {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
    </>
  );
};

const Example = () => {
  const [user, setUser] = useState({
    email: "asd",
    color: "red",
    lastName: "",
    sel: "",
    firstName: "",
    address: {}
  });
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        console.log("json", json);
        setUser({
          email: json[0].email,
          color: "red",
          lastName: json[0].username,
          sel: json[0].id,
          firstName: json[0].name,
          ...json[0]
        });
      });
  }, []);
  const handleOnChange = (e) => {
    console.log("e", e);
  };
  // React.useEffect(() => {
  //   // set the value of textC, based on textA and textB
  //   if (sel) {
  //     setFieldValue(props.name, `textA:${sel}`);
  //   }
  // }, [sel);

  return (
    <div>
      <h1>My Form</h1>
      <Formik
        initialValues={{ ...user }}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props: FormikProps<any>) => (
          <Form>
            <Field name="sel" as="select">
              {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta
              }) => (
                <div>
                  <select {...field}>
                    <option value="">Select</option>
                    <option value="1">one</option>
                    <option value="2">two</option>
                  </select>
                  {meta.touched && meta.error && (
                    <div className="error">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>

            {/* {props.values.sel > 1 ? (
              <Field name="lastName">
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta
                }) => (
                  <div>
                    <input type="text" placeholder="lastName" {...field} />
                    {meta.touched && meta.error && (
                      <div className="error">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            ) : null} */}
            <Field name="lastName" placeholder="Doe" component={MyInput} />
            <MyField name="firstName" />
            <MoreFields />
            <button type="submit">Submit</button>
            <button type="reset">reset</button>
            <br />
            <br />
            <br />
            <hr />
            {JSON.stringify(props, null, 4)}
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Example;
