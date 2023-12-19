import { useState, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";
import { app } from "firebaseApp";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const form = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    switch (name) {
      case "email":
        setEmail(value);
        const validRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!value?.match(validRegex)) {
          setError("이메일 형식이 올바르지 않습니다.");
        } else {
          setError("");
        }

        break;
      case "password":
        setPassword(value);

        if (value?.length < 8) {
          setError("비밀번호는 8자 이상이어야 합니다.");
        } else if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
          setError("비밀번호와 비밀번호 확인 값이 일치하지 않습니다.");
        } else {
          setError("");
        }

        break;
      default:
        setPasswordConfirm(value);

        if (value?.length < 8) {
          setError("비밀번호는 8자 이상이어야 합니다.");
        } else if (value !== password) {
          setError("비밀번호와 비밀번호 확인 값이 일치하지 않습니다.");
        } else {
          setError("");
        }

        break;
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);

      toast.success("회원가입에 성공하였습니다.");
      form.current?.reset();
      navigate("/");
    } catch (err: any) {
      toast.error("회원가입에 실패하였습니다. " + err?.code);
      setError(err?.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="form form-lg" ref={form}>
      <h1 className="form__title">회원가입</h1>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={onChange}
        />
      </div>

      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={onChange}
        />
      </div>

      <div className="form__block">
        <label htmlFor="password_confirm">비밀번호 확인</label>
        <input
          type="password"
          name="password_confirm"
          id="password_confirm"
          required
          onChange={onChange}
        />
      </div>

      {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}

      <div className="form__block">
        계정이 이미 있으신가요?
        <Link to="/login" className="form__link">
          로그인하기
        </Link>
      </div>

      <div className="form__block">
        <input
          type="submit"
          value="회원가입"
          className="form__btn--submit"
          disabled={error?.length > 0}
        />
      </div>
    </form>
  );
};

export default SignupForm;
