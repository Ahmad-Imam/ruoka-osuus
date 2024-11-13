"use client";

import { uploadImage } from "@/supabase/storage/client";
import { ChangeEvent, useRef, useState, useTransition } from "react";
import { convertBlobUrlToFile } from "@/lib/utils";
import Image from "next/image";

export default function FoodImage({ setFormData }) {
  const [imageUrls, setImageUrls] = useState(null);

  const imageInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const fileSelected = filesArray[0];
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));

      const newImageUrl = URL.createObjectURL(fileSelected);

      setImageUrls(newImageUrl);
    }
  };

  const [isPending, startTransition] = useTransition();

  const handleClickUploadImagesButton = async () => {
    startTransition(async () => {
      const imageFile = await convertBlobUrlToFile(imageUrls);

      const { imageUrl, error } = await uploadImage({
        file: imageFile,
        bucket: "ruoka",
      });

      if (error) {
        console.error(error);
        return;
      }

      const uploadedUrl = imageUrl;

      console.log("image urls");
      console.log(uploadedUrl);

      setFormData((prev) => ({
        ...prev,
        imageUrl: uploadedUrl,
      }));

      setImageUrls(null);
    });
  };

  return (
    <div className="flex justify-center items-center flex-col gap-8">
      {/* <Image
        src="https://higssmppvjoqahjxesne.supabase.co/storage/v1/object/public/dank-pics/b7579b8d-3734-4921-8005-57cd27b4bfd4.png"
        width={300}
        height={300}
        alt={`img-dank`}
      /> */}

      <input
        type="file"
        hidden
        multiple
        ref={imageInputRef}
        onChange={handleImageChange}
        disabled={isPending}
      />

      <button
        className="bg-slate-200 py-2 w-40 rounded-lg"
        onClick={() => imageInputRef.current?.click()}
        type="button"
        disabled={isPending}
      >
        Select Images
      </button>

      <div className="flex gap-4">
        {imageUrls && (
          <Image src={imageUrls} width={300} height={300} alt={`img`} />
        )}
      </div>

      <button
        onClick={handleClickUploadImagesButton}
        className="bg-slate-200 py-2 w-40 rounded-lg"
        disabled={isPending}
        type="button"
      >
        {isPending ? "Uploading..." : "Upload Images"}
      </button>
    </div>
  );
}
