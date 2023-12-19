import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { db } from "firebaseApp";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { toast } from "react-toastify";

import AuthContext from "context/AuthContext";

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType;
}

type TabType = "all" | "my";

export interface PostProps {
  id?: string;
  title: string;
  content: string;
  createdAt: string;
  email: string;
  summary: string;
  updatedAt: string;
  uid: string;
  category: CategoryType;
}

export type CategoryType =
  | "없음"
  | "frontend"
  | "backend"
  | "devops"
  | "design";
export const CATEGORIES: CategoryType[] = [
  "frontend",
  "backend",
  "devops",
  "design",
];

const PostList = ({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) => {
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    setPosts([]);

    let postsRef = collection(db, "posts");
    let postsQuery;

    if (activeTab === "my" && user) {
      postsQuery = query(
        postsRef,
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );
    } else {
      postsQuery = query(postsRef, orderBy("createdAt", "desc"));
    }

    const data = await getDocs(postsQuery);

    data?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("정말로 삭제하시겠습니까?");
    if (confirm && id) {
      await deleteDoc(doc(db, "posts", id));

      toast.success("게시글 삭제 완료!");
      getPosts(); // 삭제 후 포스트 다시 불러오기
    }
  };

  useEffect(() => {
    getPosts();
  }, [activeTab]); // activeTab이 바뀔 때마다 useEffect 실행

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation--active" : ""}
          >
            전체 글
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab("my")}
            className={activeTab === "my" ? "post__navigation--active" : ""}
          >
            나의 글
          </div>
        </div>
      )}

      <div className="post__list">
        {posts?.length > 0 ? (
          posts.map((post, idx) => (
            <div key={post?.id} className="post__box">
              <Link to={`/posts/${post?.id}`}>
                <div className="post__profile-box">
                  <div className="post__profile"></div>
                  <div className="post__info-box">
                    <div className="post__author-name">{post?.email}</div>
                    <div className="post__created-at">{post?.createdAt}</div>
                  </div>
                </div>
                <div className="post__title">{post?.title}</div>
                <div className="post__text">{post?.summary}</div>
              </Link>

              {post?.email === user?.email && (
                <div className="post__utils-box">
                  <div
                    className="post__delete"
                    role="presentation"
                    onClick={() => handleDelete(post.id as string)}
                  >
                    삭제
                  </div>
                  <Link to={`/posts/edit/${post?.id}`} className="post__edit">
                    수정
                  </Link>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="post__no-post">포스트가 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default PostList;
