"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { addRequestAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import RenderAddress from "@/components/RenderAddress";

export default function RequestForm({ userData }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    location: {
      latitude: "",
      longitude: "",
    },
    contact: "",
    userid: userData?.id,
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.address === "") {
      toast.error("Please select an address");
      return;
    }

    const newFood = await addRequestAction(formData);
    toast.success("Request created successfully!");
    router.push(`/details/request/${newFood.data[0].id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="w-2/3 flex flex-col items-center space-y-2 my-10">
      <h1 className="text-3xl font-bold mb-6">Create Your Request</h1>
      <form onSubmit={handleSubmit} className="space-y-6 w-2/3">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            className="dark:bg-slate-800"
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

        <Button type="submit" className="text-white">
          Share Request
        </Button>
      </form>
    </div>
  );
}
