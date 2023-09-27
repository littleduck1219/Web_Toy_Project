import Profile from "components/Profile";
import Header from "components/Header";
import Footer from "components/Footer";
import PostForm from "components/PostList";

const ProfilePage = () => {
  return (
    <>
      <Header />
      <Profile />
      <PostForm hasNavigation={false} />
      <Footer />
    </>
  );
};
export default ProfilePage;
