import Profile from "../pages/profile";
import Header from "./Header";
import Footer from "./Footer";
import PostList from "./PostList";

const ProfilePage = () => {
  return (
    <>
      <Header />
      <Profile />
      <PostList hasNavigation={false} />
      <Footer />
    </>
  );
};

export default ProfilePage;
