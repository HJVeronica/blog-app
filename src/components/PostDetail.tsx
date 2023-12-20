import { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import AuthContext from "context/AuthContext";
import { db } from "firebaseApp";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

import { toast } from "react-toastify";

import Loader from "./Loader";
import Comments from "./Comments";

import { PostProps } from "./PostList";

const PostDetail = () => {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams<{ id: string }>();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("정말로 삭제하시겠습니까?");
    if (confirm && post && post.id) {
      await deleteDoc(doc(db, "posts", post.id));
      toast.success("게시글 삭제 완료!");
      navigate("/");
    }
  };

  useEffect(() => {
    if (params?.id) {
      getPost(params?.id);
    }
  }, [params?.id]);

  return (
    <>
      <div className="post__detail">
        {post ? (
          <>
            <div className="post__box">
              <div className="post__title">{post?.title}</div>

              <div className="post__profile-box">
                <div className="post__profile"></div>
                <div>
                  <div className="post__author-name">{post?.email}</div>
                  <div className="post__created-at">{post?.createdAt}</div>
                </div>
              </div>

              {post?.email === user?.email && (
                <div className="post__utils-box">
                  <div>
                    <div
                      className="post__delete"
                      role="presentation"
                      onClick={handleDelete}
                    >
                      삭제
                    </div>
                    <Link to={`/posts/edit/${post?.id}`} className="post__edit">
                      수정
                    </Link>
                  </div>
                  {post?.category !== "없음" ? (
                    <div className="post__category">{post?.category}</div>
                  ) : null}
                </div>
              )}

              <div className="post__content post__content--pre-wrap">
                {post?.content}
              </div>
            </div>

            <Comments post={post} getPost={getPost} />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default PostDetail;
