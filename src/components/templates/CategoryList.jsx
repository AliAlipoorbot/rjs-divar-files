import { useQuery } from "@tanstack/react-query";

import { getCategory, removeCategory } from "services/admin";
import Loader from "../modules/Loader";

import styles from "./styles/CategoryList.module.css";
import toast from "react-hot-toast";

function CategoryList() {
  const { data, isLoading, refetch } = useQuery(
    ["get-categories"],
    getCategory
  );
  console.log({ data, isLoading });

  const removeHandler = async (id) => {
    const res = await removeCategory(id);
    console.log(res);
    refetch();
    toast.success("دسته بندی با موفقیت حذف شد");
  };

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        data.data.map((i) => (
          <div key={i._id}>
            <img src={`${i.icon}.svg`} />
            <h5>{i.name}</h5>
            <button onClick={() => removeHandler(i._id)}>حذف</button>
            <p>slug: {i.slug}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CategoryList;
