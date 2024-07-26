import { Link } from "react-router-dom";

const VerifyEmailPending = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-8">
      <h1 className="mb-4 text-2xl font-bold text-gray-300">
        Verify Your Email
      </h1>
      <p className="mb-4 text-center font-medium text-gray-300">
        We&apos;ve sent a verification email to your address. Please check your
        inbox and click the verification link.
      </p>
      <p>
        Once verified, you can{" "}
        <Link to={"/sign-in"} className="font-bold text-purple-600">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default VerifyEmailPending;
