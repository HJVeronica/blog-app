import { useState, useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "firebaseApp";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthContext from "context/AuthContext";

const PostForm = () => {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;

    if (name === "title") {
      setTitle(value);
    } else if (name === "summary") {
      setSummary(value);
    } else if (name === "content") {
      setContent(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // firestore 데이터 추가
      await addDoc(collection(db, "posts"), {
        createdAt: new Date().toLocaleDateString(),
        email: user?.email,
        title: title,
        summary: summary,
        content: content,
      });

      toast?.success("게시글 작성 완료!");
      navigate("/");
    } catch (error: any) {
      toast?.error("게시글 작성 실패!" + error?.code);
      console.log(error);
    }
  };
  return (
    <form onSubmit={onSubmit} className="form">
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          onChange={onChange}
          value={title}
        />
      </div>

      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input
          type="text"
          name="summary"
          id="summary"
          required
          onChange={onChange}
          value={summary}
        />
      </div>

      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea
          name="content"
          id="content"
          required
          onChange={onChange}
          value={content}
        />
      </div>

      <div className="form__block">
        <input type="submit" value="작성하기" className="form__btn--submit" />
      </div>
    </form>
  );
};

export default PostForm;
