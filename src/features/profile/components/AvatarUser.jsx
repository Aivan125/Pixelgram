import { Input } from "@/components/ui/input";
import { useGetCurrentUser } from "@/features/auth/hooks/useGetCurrentUser";
import React, { forwardRef, useEffect, useState } from "react";

const AvatarUser = forwardRef(({ onChange, value, name, onBlur }, ref) => {
  const { user } = useGetCurrentUser();
  const [imagePreview, setImagePreview] = useState(user.avatarUrl);

  useEffect(() => {
    // Pasar el valor inicial al formulario
    if (!value && user.avatarUrl) {
      onChange(user.avatarUrl);
    }
  }, [onChange, user.avatarUrl, value]);

  useEffect(() => {
    if (value instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(value);
    } else if (typeof value === "string") {
      setImagePreview(value);
    }
  }, [value]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      onChange(file);
    } else if (!file && imagePreview) {
      // Si no se selecciona un nuevo archivo, mantener la URL existente
      onChange(imagePreview);
    } else {
      console.error("Por favor, seleccione un archivo de imagen válido");
    }
  };

  return (
    <div className="relative h-24 w-24">
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        onBlur={onBlur}
        name={name}
        ref={ref}
        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
      />
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-300">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <svg
            className="h-8 w-8 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        )}
      </div>
    </div>
  );
});

AvatarUser.displayName = "AvatarUser";
export default AvatarUser;
