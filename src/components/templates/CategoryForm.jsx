import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addCategory } from "services/admin";

import styles from "./styles/CategoryForm.module.css";

function CategoryForm() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({ name: "", slug: "", icon: "" });

  const { mutate, data, isLoading, error } = useMutation(addCategory, {
    onSuccess: () => queryClient.invalidateQueries("get-categories"),
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!form.name || !form.slug || !form.icon) return;
    mutate(form);
    toast.success("دسته بندی با موفقیت اضافه شد");
    if (error) {
      toast.error("مشکلی پیش امده است");
    }
  };

  console.log({ data, isLoading, error });

  return (
    <form
      onSubmit={submitHandler}
      onChange={changeHandler}
      className={styles.form}
    >
      <h3>دسته بندی جدید</h3>
      <label htmlFor="name">اسم دسته بندی</label>
      <input type="text" id="name" name="name" />
      <label htmlFor="slug">اسلاگ</label>
      <input type="text" id="slug" name="slug" />
      <label htmlFor="icon">ایکون</label>
      <input type="text" id="icon" name="icon" />
      <button type="submit" disabled={isLoading}>
        ایجاد
      </button>
    </form>
  );
}

export default CategoryForm;
