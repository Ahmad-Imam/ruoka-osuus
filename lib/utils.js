import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function convertBlobUrlToFile(blobUrl) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const fileName = Math.random().toString(36).slice(2, 9);
  const mimeType = blob.type || "application/octet-stream";
  const file = new File([blob], `${fileName}.${mimeType.split("/")[1]}`, {
    type: mimeType,
  });
  return file;
}

export function getAvgReviews(reviews) {
  let access_review = 0;
  let comm_review = 0;
  let quality_review = 0;
  let total = reviews?.length;

  reviews?.forEach((review) => {
    access_review += review.access_review;
    comm_review += review.comm_review;
    quality_review += review.quality_review;
  });

  access_review = Math.floor(access_review / total);
  comm_review = Math.floor(comm_review / total);
  quality_review = Math.floor(quality_review / total);

  return { access_review, comm_review, quality_review };
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
