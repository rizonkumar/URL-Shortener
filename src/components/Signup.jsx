import React, { useEffect, useState } from "react";
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
import useFetch from "@/hooks/use-fetch";
import { signUp } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { URLState } from "@/Context";

const Signup = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    profile_pic: null,
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const longLink = searchParams.get("createNew");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const { data, error, loading, fn: fnSignup } = useFetch(signUp, formData);
  const { fetchUser } = URLState();

  useEffect(() => {
    console.log("data", data);
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [error, loading]);

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is Required"),
        password: Yup.string()
          .min(6, "Password must be atleast 6 character")
          .required("Password is Required"),
        confirmpassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(formData, { abortEarly: false });

      // api call
      await fnSignup();
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
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Create an account if you don't have one
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            placeholder="Enter Name"
            onChange={handleInputChange}
          />
          {errors.name && <Error message={errors.name} />}
        </div>
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
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
        <div className="space-y-1">
          <Input
            name="profile_pic"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
          />
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup}>
          {loading ? (
            <BeatLoader size={12} color="#36d7b7" />
          ) : (
            "Create Account"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
