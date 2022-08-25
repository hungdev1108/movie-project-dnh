import { Button, Input } from "antd";
import instance from "api/instance";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import styles from "./style.module.css";

const schema = yup.object().shape({
  taiKhoan: yup.string().required("*Trường này bắt buộc nhập!"),
  matKhau: yup.string().required("*Trường này bắt buộc nhập!").min(8, "Mật khẩu phải từ 8 đến 16 ký tự!"),
});

function Signin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },

    onSubmit: (values) => {
      signIn(values);
    },
    validationSchema: schema,
  });

  const signIn = async (user) => {
    try {
      setIsLoading(true);
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/DangNhap",
        method: "POST",
        data: user,
      });

      const profile = { ...res.data.content };
      delete profile.accessToken;

      localStorage.setItem("token", res.data.content.accessToken);
      dispatch({
        type: "SET_PROFILE",
        payload: profile,
      });
      history.push("/");
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className={styles.title}>Sign up</h2>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <Input
          name="taiKhoan"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
          type="text"
          placeholder="Username"
        />
        {formik.touched.taiKhoan && formik.errors.taiKhoan && (
          <p className={styles.errorText}>{formik.errors.taiKhoan}</p>
        )}

        <Input
          name="matKhau"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
          type="password"
          placeholder="Password"
        />
        {formik.touched.matKhau && formik.errors.matKhau && <p className={styles.errorText}>{formik.errors.matKhau}</p>}

        <Button htmlType="submit" type="primary" loading={isLoading}>
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default Signin;
