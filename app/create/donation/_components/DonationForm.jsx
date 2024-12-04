"use client";

import { useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { addFoodAction, getAllFoodAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { uploadImage } from "@/supabase/storage/client";
import { convertBlobUrlToFile } from "@/lib/utils";
import RenderAddress from "@/components/RenderAddress";

export default function DonationForm({ userData }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    expirationdate: "",
    category: "",
    address: "",
    location: {
      latitude: "",
      longitude: "",
    },
    contact: "",
    imageUrl: "",
    userid: userData?.id,
    fstatus: "available",
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
      toast.error("Please select an image of the food");
      return;
    }

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

      const newFood = await addFoodAction(updatedFormData);
      toast.success("Food shared successfully!");
      router.push(`/details/donation/${newFood.data[0].id}`);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

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
      <h1 className="text-3xl font-bold mb-6">Create Your Donation</h1>
      <form onSubmit={handleSubmit} className="space-y-6 w-2/3">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            className="dark:bg-slate-800"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="dark:bg-slate-800"
            required
          />
        </div>
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            className="dark:bg-slate-800"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="expirationdate">Expiration Date</Label>
          <Input
            id="expirationdate"
            className="dark:bg-slate-800"
            name="expirationdate"
            type="date"
            value={formData.expirationdate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            name="category"
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger className="dark:bg-slate-800">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fruits">Fruits</SelectItem>
              <SelectItem value="vegetables">Vegetables</SelectItem>
              <SelectItem value="grains">Grains</SelectItem>
              <SelectItem value="protein">Protein</SelectItem>
              <SelectItem value="dairy">Dairy</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
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
            className="bg-slate-200 dark:bg-slate-800 py-2 w-40 rounded-lg"
            onClick={() => imageInputRef.current?.click()}
            type="button"
            disabled={isPending}
          >
            Select Image
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
            className="dark:bg-slate-800"
            placeholder="Phone number or email"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>
        <RenderAddress setFormData={setFormData} />

        <Button type="submit" disabled={isPending} className="text-white">
          {isPending ? "Uploading..." : "Share Donation"}
        </Button>
      </form>
    </div>
  );
}
