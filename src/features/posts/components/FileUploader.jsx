import { Button } from "@/components/ui/button";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({ fieldChange, mediaUrl }) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const [file, setFile] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file],
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="mx-auto flex h-full w-full cursor-pointer flex-col items-center justify-center"
    >
      <input
        {...getInputProps()}
        className="flex cursor-pointer items-center justify-center"
      />
      {fileUrl ? (
        <>
          <div className="flex h-full max-h-[520px] w-full max-w-[520px] items-center justify-center overflow-hidden rounded-xl border-[1px] border-gray-600 bg-gray-900">
            <img
              src={fileUrl}
              alt="image"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="mb-4 flex h-full max-h-[520px] w-full max-w-[520px] flex-col items-center justify-center overflow-hidden rounded-xl border-[1px] border-gray-600 bg-gray-900">
          <img
            src="../../../../public/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file-upload"
          />
          <h3 className="mb-2 mt-6 font-semibold text-gray-400">
            Drag photo here
          </h3>
          <p className="font-semibold text-gray-400">SVG, PNG, JPG</p>
          <Button variant="secondary" className="mt-4">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
