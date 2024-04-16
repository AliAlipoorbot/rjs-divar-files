import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { forwardRef } from "react";

import styles from "./styles/Header.module.css";
import { getProfile } from "services/user";
import { removeCookie } from "utils/cookie";

import WithClickOutside from "components/modules/WithClickOutside";

const Header = forwardRef(({ open, setOpen }, ref) => {
  const { data, refetch } = useQuery(["profile"], getProfile);

  const clickHandler = () => {
    setOpen((state) => !state);
  };

  const exitHandler = () => {
    removeCookie();
    refetch();
    setOpen(false);
  };

  return (
    <header className={styles.header} ref={ref}>
      <div>
        <Link to="/">
          <img src="divar.svg" className={styles.logo} />
        </Link>
        <span>
          <img src="location.svg" />
          <p>تهران</p>
        </span>
      </div>
      <div>
        <button onClick={clickHandler}>
          <span>
            <img src="profile.svg" />
            <p>دیوار من</p>
          </span>
        </button>
        <Link to="/dashboard" className={styles.button}>
          ثبت آگهی
        </Link>
      </div>
      {open && (
        <div className={styles.dropDownMenu}>
          {!data && (
            <ul>
              <li>
                <Link to="/auth">ورود</Link>
              </li>
            </ul>
          )}
          {data && data?.data.role === "ADMIN" && (
            <>
              <ul>
                <li>
                  <Link to="/admin">پنل ادمین</Link>
                </li>
              </ul>
              <hr />
            </>
          )}
          {data && (
            <>
              <ul>
                <li>
                  <Link to="/" onClick={exitHandler}>
                    خروج
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
      )}
    </header>
  );
});

export default WithClickOutside(Header);
