import { useState, useContext, useEffect } from "react";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import AuthContext from "context/AuthContext";
import { CATEGORIES, CategoryType, PostProps } from "./PostList";

const PostForm = () => {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<CategoryType | string>("없음");
  const [post, setPost] = useState<PostProps | null>(null);

  const { user } = useContext(AuthContext);
  const params = useParams<{ id: string }>();

  const navigate = useNavigate();

  const onChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
    } else if (name === "category") {
      setCategory(value as CategoryType);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post.id) {
        // firestore 데이터 수정
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          title: title,
          summary: summary,
          content: content,
          updatedAt: new Date().toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          category: category,
        });

        toast?.success("게시글 수정 완료!");
        navigate(`/posts/${post.id}`);
      } else {
        // firestore 데이터 추가
        await addDoc(collection(db, "posts"), {
          createdAt: new Date().toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          email: user?.email,
          title: title,
          summary: summary,
          content: content,
          uid: user?.uid,
          category: category,
        });

        toast?.success("게시글 작성 완료!");
        navigate("/");
      }
    } catch (error: any) {
      toast?.error("게시글 작성 실패!" + error?.code);
      console.log(error);
    }
  };

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

  useEffect(() => {
    if (params?.id) {
      getPost(params?.id);
    }
  }, [params?.id]);

  // 수정 작업일 경우 form에 원래 데이터 채워넣기
  useEffect(() => {
    if (post) {
      setTitle(post?.title);
      setSummary(post?.summary);
      setContent(post?.content);
      setCategory(post?.category);
    }
  }, [post]);

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
        <label htmlFor="category">카테고리</label>
        <select
          name="category"
          id="category"
          onChange={onChange}
          defaultValue={category}
        >
          <option value="없음">카테고리를 선택해주세요.</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
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
        <input
          type="submit"
          value={post ? "수정하기" : "작성하기"}
          className="form__btn--submit"
        />
      </div>
    </form>
  );
};

export default PostForm;
