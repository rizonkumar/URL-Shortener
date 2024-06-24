import React, { useState } from "react";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import * as Yup from "yup";
import Error from "./Error.jsx";

const Login = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is Required"),
        password: Yup.string()
          .min(6, "Password must be atleast 6 character")
          .required("Password is Required"),
        confirmpassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      });

      await schema.validate(formData, { abortEarly: false });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login to your account if you already have one
        </CardDescription>
        <Error message={"some error"} />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={handleInputChange}
          />
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.password} />}
        </div>
        <div className="space-y-1">
          <Input
            name="confirmpassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleInputChange}
          />
          {errors.confirmpassword && <Error message={errors.confirmpassword} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin}>
          {true ? <BeatLoader size={12} color="#36d7b7" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
