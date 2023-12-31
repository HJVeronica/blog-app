import { useState, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";
import { app } from "firebaseApp";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { toast } from "react-toastify";

const LoginForm = () => {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
      default:
        setPassword(value);
        if (value?.length < 8) {
          setError("비밀번호는 8자 이상이어야 합니다.");
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
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("로그인 성공!");
      form.current?.reset();
      navigate("/");
    } catch (error: any) {
      setError(error?.message);
      toast.error(error?.code);
    }
  };

  return (
    <form onSubmit={onSubmit} className="form form-lg" ref={form}>
      <h1 className="form__title">로그인</h1>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={onChange}
          value={email}
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
          value={password}
        />
      </div>

      {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}

      <div className="form__block">
        계정이 없으신가요?{" "}
        <Link to="/signup" className="form__link">
          회원가입하기
        </Link>
      </div>

      <div className="form__block">
        <input
          type="submit"
          value="로그인"
          className="form__btn--submit"
          disabled={error?.length > 0}
        />
      </div>
    </form>
  );
};

export default LoginForm;
