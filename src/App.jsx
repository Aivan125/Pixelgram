import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./features/auth/pages/AuthLayout";
import SignInForm from "./features/auth/components/SignInForm";
import SignUpForm from "./features/auth/components/SignUpForm";
// import Home from "./features/home/pages/Home";
// import Explore from "./features/explore/pages/Explore";
// import SavedPosts from "./features/posts/pages/SavedPosts";
// import CreatePost from "./features/posts/pages/CreatePost";
// import EditPost from "./features/posts/pages/EditPost";
// import PostDetail from "./features/posts/pages/PostDetail";
// import ProfilePage from "./features/profile/pages/ProfilePage";
// import EditProfile from "./features/auth/pages/EditProfile";
// import PeopleProfile from "./features/allUsers/components/PeopleProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";
import { lazy, Suspense } from "react";
import AppLayout from "./features/auth/pages/AppLayout";
import PrivateRoutes from "./components/ui/PrivateRoutes";
import SpinnerFullPage from "./components/ui/SpinnerFullPage";
import FollowersPage from "./features/profile/components/FollowersPage";
import FollowingPage from "./features/profile/components/FollowingPage";
import VerifyEmailPending from "./components/ui/VerifyEmailPending";
import VerifyEmail from "./components/ui/VerifyEmail";
import PageNotFound from "./components/pages/PageNotFound";

const Home = lazy(() => import("./features/home/pages/Home"));
const Explore = lazy(() => import("./features/explore/pages/Explore"));
const SavedPosts = lazy(() => import("./features/posts/pages/SavedPosts"));
const CreatePost = lazy(() => import("./features/posts/pages/CreatePost"));
const EditPost = lazy(() => import("./features/posts/pages/EditPost"));
const PostDetail = lazy(() => import("./features/posts/pages/PostDetail"));
const ProfilePage = lazy(() => import("./features/profile/pages/ProfilePage"));
const EditProfile = lazy(() => import("./features/auth/pages/EditProfile"));
const PeopleProfile = lazy(
  () => import("./features/allUsers/components/PeopleProfile"),
);

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 20000,
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="sign-in" element={<SignInForm />} />
              <Route path="sign-up" element={<SignUpForm />} />
              <Route
                path="verify-email-pending"
                element={<VerifyEmailPending />}
              />
              <Route path="verify-email" element={<VerifyEmail />} />
            </Route>
            <Route
              element={
                <PrivateRoutes>
                  <Suspense fallback={<SpinnerFullPage />}>
                    <AppLayout />
                  </Suspense>
                </PrivateRoutes>
              }
            >
              <Route path="/" index element={<Home />} />
              <Route path="explore" element={<Explore />} />
              <Route path="saved" element={<SavedPosts />} />
              <Route path="create-post" element={<CreatePost />} />
              <Route path="editPost/:postId" element={<EditPost />} />
              <Route path="post/:postId" element={<PostDetail />} />
              <Route path="profile/:userId" element={<ProfilePage />} />
              <Route path="editProfile" element={<EditProfile />} />
              <Route path="people" element={<PeopleProfile />} />
              <Route path="followers/:userId" element={<FollowersPage />} />
              <Route path="following/:userId" element={<FollowingPage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};

export default App;
