import { useState } from "react";

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

const Comments = () => {
  const [comment, setComment] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "comment") {
      setComment(value);
    }
  };

  return (
    <div className="comments">
      <div className="comments__list">
        {COMMENTS.map((comment) => (
          <div className="comment__box" key={comment.id}>
            <div className="comment__profile-box">
              <div className="comment__email">{comment?.email}</div>
              <div className="comment__created-at">{comment?.createdAt}</div>
              <div className="comment__delete">삭제</div>
            </div>

            <div className="comment__content">{comment.content}</div>
          </div>
        ))}
      </div>

      <form className="comments__form">
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
