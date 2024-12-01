"use client";

import { useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { addEventAction, addFoodAction, getAllFoodAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { uploadImage } from "@/supabase/storage/client";
import { convertBlobUrlToFile } from "@/lib/utils";
import RenderAddress from "@/components/RenderAddress";

export default function EventForm({ userData }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    estimatedate: "",
    address: "",
    location: {
      latitude: "",
      longitude: "",
    },
    contact: "",
    imageUrl: "",
    userid: userData?.id,
  });

  const router = useRouter();

  const [imageUrls, setImageUrls] = useState(null);

  const imageInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const fileSelected = filesArray[0];
      const newImageUrl = URL.createObjectURL(fileSelected);
      setImageUrls(newImageUrl);
    }
  };

  const [isPending, startTransition] = useTransition();

  const handleClickUploadImagesButton = async () => {
    if (!imageUrls) {
      const newFood = await addEventAction(formData);
      toast.success("Event added successfully!");
      router.push(`/details/event/${newFood.data[0].id}`);
    } else {
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

        const updatedFormData = {
          ...formData,
          imageUrl: uploadedUrl,
        };
        setImageUrls(null);
        const newFood = await addEventAction(updatedFormData);
        toast.success("Food shared successfully!");
        router.push(`/details/event/${newFood.data[0].id}`);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.address === "Initial Address" ||
      !formData.address ||
      formData.address === ""
    ) {
      toast.error("Please add an address");
      return;
    }

    await handleClickUploadImagesButton();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-2/3 flex flex-col items-center space-y-2 my-10">
      <h1 className="text-3xl font-bold mb-6">Create your event</h1>
      <form onSubmit={handleSubmit} className="space-y-6 w-2/3">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            className="dark:bg-slate-800"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            className="dark:bg-slate-800"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="estimatedate">Estimated Date</Label>
          <Input
            className="dark:bg-slate-800"
            id="estimatedate"
            name="estimatedate"
            type="date"
            value={formData.estimatedate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex justify-center items-center flex-col gap-8">
          <input
            type="file"
            hidden
            ref={imageInputRef}
            onChange={handleImageChange}
            disabled={isPending}
          />

          <button
            className="bg-slate-200 py-2 w-40 rounded-lg dark:bg-slate-800"
            onClick={() => imageInputRef.current?.click()}
            type="button"
            disabled={isPending}
          >
            Select Image (Optional)
          </button>

          <div className="flex gap-4">
            {imageUrls && (
              <Image src={imageUrls} width={300} height={300} alt={`img`} />
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="contact">Contact</Label>
          <Input
            id="contact"
            name="contact"
            placeholder="Phone number or email"
            value={formData.contact}
            onChange={handleChange}
            className="dark:bg-slate-800"
            required
          />
        </div>
        <RenderAddress setFormData={setFormData} />

        <Button type="submit" disabled={isPending} className="text-white">
          {isPending ? "Uploading..." : "Share Event"}
        </Button>
      </form>
    </div>
  );
}
