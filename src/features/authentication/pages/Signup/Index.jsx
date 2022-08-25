import { Button, Input } from "antd";
import instance from "api/instance";
import { useFormik } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import styles from "./style.module.css";

//Phone regex
const phoneRegExp = /(84|0)+([0-9]{9})\b/;

const schema = yup.object().shape({
  taiKhoan: yup.string().required("*Trường này bắt buộc nhập!"),
  matKhau: yup.string().required("*Trường này bắt buộc nhập!").min(8, "Mật khẩu phải từ 8 đến 16 ký tự!"),
  hoTen: yup
    .string()
    .required("*Trường này bắt buộc nhập!")
    .matches(/^[A-Za-z ]+$/g, "Họ tên không đúng định dạng!"),
  email: yup.string().required("*Trường này bắt buộc nhập!").email("Email không hợp lệ!"),
  soDt: yup.string().required("*Trường này bắt buộc nhập").matches(phoneRegExp, "Số điện thoại không hợp lệ!"),
});

function Signup() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      hoTen: "",
    },

    onSubmit: (values) => {
      const newUser = { ...values, maNhom: "GP02" };
      signUp(newUser);
    },

    validationSchema: schema,
  });

  const signUp = async (user) => {
    try {
      setIsLoading(true);
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/DangKy",
        method: "POST",
        data: user,
      });
      console.log(res.data);
      history.push("/signin");
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
          name="hoTen"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
          type="text"
          placeholder="Fullname"
        />
        {formik.touched.hoTen && formik.errors.hoTen && <p className={styles.errorText}>{formik.errors.hoTen}</p>}
        <Input
          name="matKhau"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
          type="password"
          placeholder="Password"
        />
        {formik.touched.matKhau && formik.errors.matKhau && <p className={styles.errorText}>{formik.errors.matKhau}</p>}

        <Input
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
          type="text"
          placeholder="Email"
        />
        {formik.touched.email && formik.errors.email && <p className={styles.errorText}>{formik.errors.email}</p>}

        <Input
          name="soDt"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
          type="text"
          placeholder="Phone number"
        />
        {formik.touched.soDt && formik.errors.soDt && <p className={styles.errorText}>{formik.errors.soDt}</p>}
        <Button htmlType="submit" type="primary" loading={isLoading}>
          Sign up
        </Button>
      </form>
    </div>
  );
}

export default Signup;
