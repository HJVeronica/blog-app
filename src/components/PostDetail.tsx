import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import AuthContext from "context/AuthContext";
import { db } from "firebaseApp";
import { doc, getDoc } from "firebase/firestore";

import Loader from "./Loader";

import { PostProps } from "./PostList";

const PostDetail = () => {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams<{ id: string }>();
  const { user } = useContext(AuthContext);

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

  const handleDelete = () => {
    console.log("delete");
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
            )}

            <div className="post__content post__content--pre-wrap">
              {post?.content}
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default PostDetail;
