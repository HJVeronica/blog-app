import { useState, useContext } from "react";
import { CommentsInterface, PostProps } from "./PostList";
import AuthContext from "context/AuthContext";

import { db } from "firebaseApp";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import { toast } from "react-toastify";

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

  const handleDeleteComment = async (data: CommentsInterface) => {
    const confirm = window.confirm("정말로 삭제하시겠습니까?");

    if (confirm && post.id) {
      const postRef = doc(db, "posts", post?.id);
      await updateDoc(postRef, {
        comments: arrayRemove(data),
      });

      toast.success("게시글 삭제 완료!");
      getPost(post.id); // 삭제 후 포스트 다시 불러오기
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
                {comment.uid === user?.uid && (
                  <div
                    className="comment__delete"
                    onClick={() => handleDeleteComment(comment)}
                  >
                    삭제
                  </div>
                )}
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
