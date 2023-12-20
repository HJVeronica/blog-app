import { useState, useContext, useEffect } from "react";
import { PostProps } from "./PostList";
import AuthContext from "context/AuthContext";

import { db } from "firebaseApp";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import { toast } from "react-toastify";

// dummy data
const COMMENTS = [
  {
    id: 1,
    content: "댓글 1",
    email: "test@gmail.com",
    createdAt: "2021-09-01",
  },
  {
    id: 2,
    content: "댓글 2",
    email: "test2@gmail.com",
    createdAt: "2021-09-02",
  },
  {
    id: 3,
    content: "댓글 3",
    email: "test3@gmail.com",
    createdAt: "2021-09-03",
  },
  {
    id: 4,
    content: "댓글 4",
    email: "test4@gmail.com",
    createdAt: "2021-09-04",
  },
];

interface CommentsProps {
  post: PostProps;
  getPost: (id: string) => Promise<void>;
}

const Comments = ({ post, getPost }: CommentsProps) => {
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "comment") {
      setComment(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post?.id) {
        const postRef = doc(db, "posts", post.id);

        if (user?.uid) {
          const commentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            createdAt: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          };

          await updateDoc(postRef, {
            comments: arrayUnion(commentObj),
            updatedAt: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          });

          await getPost(post.id);
        }
      }

      toast.success("댓글 작성 완료!");
      setComment("");
    } catch (err: any) {
      console.log(err?.code);
    }
  };

  return (
    <div className="comments">
      <div className="comments__list">
        {post?.comments
          ?.slice(0)
          ?.reverse()
          .map((comment) => (
            <div className="comment__box" key={comment.createdAt}>
              <div className="comment__profile-box">
                <div className="comment__email">{comment?.email}</div>
                <div className="comment__created-at">{comment?.createdAt}</div>
                <div className="comment__delete">삭제</div>
              </div>

              <div className="comment__content">{comment.content}</div>
            </div>
          ))}
      </div>

      <form onSubmit={onSubmit} className="comments__form">
        <div className="form__block">
          <label htmlFor="comment">댓글 입력</label>
          <textarea
            name="comment"
            id="comment"
            required
            value={comment}
            onChange={onChange}
          ></textarea>
        </div>

        <div className="form__block form__block-reverse">
          <input
            type="submit"
            value="댓글 작성"
            className="form__btn-submit "
          />
        </div>
      </form>
    </div>
  );
};

export default Comments;
