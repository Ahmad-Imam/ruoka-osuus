"use client";

import { useState } from "react";
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
import ShareAddress from "./ShareAddress";
import FoodImage from "@/components/FoodImage";
import { toast } from "sonner";
import { deleteImage } from "@/supabase/storage/client";
import { addFoodAction, getAllFoodAction } from "@/app/actions";

export default function ShareForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    expirationDate: "",
    category: "",
    address: "",
    location: {
      latitude: "",
      longitude: "",
    },
    imageUrl: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend)
    console.log("Form submitted:", formData);
    toast.success("Food shared successfully!");

    // await deleteImage(
    //   "https://hheakidhvgpegldaqczr.supabase.co/storage/v1/object/public/ruoka/2b7636de-5774-439b-babf-cecef30b0b57.jpeg"
    // );

    const newFood = await addFoodAction(formData);
    console.log(newFood);
    const allFood = await getAllFoodAction();
    console.log(allFood);

    // Reset form or show success message
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="w-2/3 flex flex-col items-center space-y-2 my-10">
      <h1 className="text-3xl font-bold mb-6">Share Your Food</h1>
      <form onSubmit={handleSubmit} className="space-y-6 w-2/3">
        <div>
          <Label htmlFor="title">Food Name</Label>
          <Input
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
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="amount">amount</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="expirationDate">Expiration Date</Label>
          <Input
            id="expirationDate"
            name="expirationDate"
            type="date"
            value={formData.expirationDate}
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
            <SelectTrigger>
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

        <FoodImage setFormData={setFormData} />

        <ShareAddress setFormData={setFormData} />

        <Button type="submit">Share Food</Button>
      </form>
    </div>
  );
}
