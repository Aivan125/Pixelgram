import { useUpdateVerificationEmail } from "@/features/auth/hooks/useUpdateVerificationEmail";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [invalidParams, setInvalidParams] = useState(false);
  const [searchParams] = useSearchParams();

  const {
    updateVerificationEmailUser,
    isVerifyingEmail,
    isSuccess,
    error,
    isError,
  } = useUpdateVerificationEmail();

  useEffect(() => {
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    console.log(userId);
    console.log(secret);

    if (userId && secret) {
      updateVerificationEmailUser({ userId, secret });
    } else {
      setInvalidParams(true);
    }
  }, [location, updateVerificationEmailUser, searchParams]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => navigate("sign-in"), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  if (invalidParams) {
    return (
      <p className="text-center font-medium text-gray-300">
        Invalid verification link. Missing required parameters.
      </p>
    );
  }

  if (isVerifyingEmail) {
    return (
      <p className="text-center font-medium text-gray-300">
        Verifying your email...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-center font-medium text-gray-300">
        Verification failed. {error?.message || "Please try again."}
      </p>
    );
  }

  if (isSuccess) {
    return (
      <p className="text-center font-medium text-gray-300">
        Email verified successfully! Redirecting to home page...
      </p>
    );
  }

  return (
    <p className="text-center font-medium text-gray-300">
      Waiting for verification process to start...
    </p>
  );
};

export default VerifyEmail;
