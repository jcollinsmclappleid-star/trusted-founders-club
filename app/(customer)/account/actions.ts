"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { categoryOptions } from "@/lib/site";
import { createSupabaseUserServerClient, getCurrentUser } from "@/lib/supabase-auth-server";
import {
  getCustomerSubmissionById,
  isCustomerEditable,
} from "@/lib/submissions";

const imageTypes = ["image/jpeg", "image/png", "image/webp"];

export async function updateCustomerSubmissionAction(formData: FormData) {
  const { user } = await getCurrentUser();
  const id = String(formData.get("id") ?? "");

  if (!user) redirect(`/login?next=/account/submissions/${id}`);

  const { submission } = await getCustomerSubmissionById(id, user.id);
  if (!submission) redirect("/account/submissions");
  if (!isCustomerEditable(submission)) {
    redirect(
      `/account/submissions/${id}?tone=warning&message=${encodeURIComponent(
        "This submission can no longer be edited.",
      )}`,
    );
  }

  const appName = trim(formData.get("app_name"));
  const appUrl = trim(formData.get("app_url"));
  const category = trim(formData.get("category"));
  const shortDescription = trim(formData.get("short_description"));
  const targetCustomer = trim(formData.get("target_customer"));
  const problemSolved = trim(formData.get("problem_solved"));
  const appFunctionality = trim(formData.get("app_functionality"));

  const errors = [
    !appName && "App name is required.",
    !isValidHttpUrl(appUrl) && "A valid app URL is required.",
    !categoryOptions.includes(category) && "Choose a valid category.",
    !shortDescription && "Short description is required.",
    !targetCustomer && "Target customer is required.",
    !problemSolved && "Problem solved is required.",
    !appFunctionality && "App functionality is required.",
  ].filter(Boolean);

  if (errors.length > 0) {
    redirect(
      `/account/submissions/${id}?tone=warning&message=${encodeURIComponent(
        errors.join(" "),
      )}`,
    );
  }

  const { client, error } = await createSupabaseUserServerClient();
  if (!client) {
    redirectToSubmission(id, error ?? "Supabase auth is not configured.", "danger");
  }
  const supabase = client;

  const { error: updateError } = await supabase
    .from("app_submissions")
    .update({
      app_name: appName,
      app_url: appUrl,
      category,
      short_description: shortDescription,
      target_customer: targetCustomer,
      problem_solved: problemSolved,
      app_functionality: appFunctionality,
      founder_note: nullable(formData.get("founder_note")),
      review_attention_notes: nullable(formData.get("review_attention_notes")),
      customer_updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (updateError) {
    redirectToSubmission(id, updateError.message, "danger");
  }

  revalidatePath("/account");
  revalidatePath("/account/submissions");
  revalidatePath(`/account/submissions/${id}`);
  redirectToSubmission(id, "Submission details updated.", "success");
}

export async function uploadSubmissionAssetAction(formData: FormData) {
  const { user } = await getCurrentUser();
  const id = String(formData.get("id") ?? "");
  const assetType = String(formData.get("asset_type") ?? "");

  if (!user) redirect(`/login?next=/account/submissions/${id}`);

  const { submission } = await getCustomerSubmissionById(id, user.id);
  if (!submission) redirect("/account/submissions");
  if (!isCustomerEditable(submission)) {
    redirectToSubmission(id, "Assets can no longer be changed for this submission.", "warning");
  }

  const file = formData.get("asset");
  if (!(file instanceof File) || file.size === 0) {
    redirectToSubmission(id, "Choose an image file to upload.", "warning");
  }

  const isLogo = assetType === "logo";
  const isScreenshot = assetType === "screenshot";
  if (!isLogo && !isScreenshot) {
    redirectToSubmission(id, "Invalid asset type.", "warning");
  }

  if (!imageTypes.includes(file.type)) {
    redirectToSubmission(id, "Upload a JPG, PNG or WebP image.", "warning");
  }

  const maxSize = isLogo ? 3 * 1024 * 1024 : 5 * 1024 * 1024;
  if (file.size > maxSize) {
    redirectToSubmission(
      id,
      isLogo ? "Logo must be 3MB or smaller." : "Screenshot must be 5MB or smaller.",
      "warning",
    );
  }

  const extension = fileExtension(file.name, file.type);
  const path = `${user.id}/${id}/${assetType}-${Date.now()}.${extension}`;

  const { client, error } = await createSupabaseUserServerClient();
  if (!client) {
    redirectToSubmission(id, error ?? "Supabase auth is not configured.", "danger");
  }
  const supabase = client;

  const { error: uploadError } = await supabase.storage
    .from("listing-assets")
    .upload(path, file, {
      upsert: true,
      contentType: file.type,
    });

  if (uploadError) {
    redirectToSubmission(id, uploadError.message, "danger");
  }

  const update = isLogo
    ? {
        logo_storage_path: path,
        logo_alt: `${submission.app_name} logo`,
        asset_upload_status: "logo_uploaded",
        customer_updated_at: new Date().toISOString(),
      }
    : {
        screenshot_storage_path: path,
        screenshot_alt: `${submission.app_name} screenshot`,
        asset_upload_status: "screenshot_uploaded",
        customer_updated_at: new Date().toISOString(),
      };

  const { error: updateError } = await supabase
    .from("app_submissions")
    .update(update)
    .eq("id", id)
    .eq("user_id", user.id);

  if (updateError) {
    redirectToSubmission(id, updateError.message, "danger");
  }

  revalidatePath("/account/submissions");
  revalidatePath(`/account/submissions/${id}`);
  redirectToSubmission(id, isLogo ? "Logo uploaded." : "Screenshot uploaded.", "success");
}

function trim(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function nullable(value: FormDataEntryValue | null) {
  const normalized = trim(value);
  return normalized || null;
}

function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function fileExtension(filename: string, mime: string) {
  const extension = filename.split(".").pop()?.toLowerCase();
  if (extension && ["jpg", "jpeg", "png", "webp"].includes(extension)) {
    return extension;
  }
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "jpg";
}

function redirectToSubmission(
  id: string,
  message: string,
  tone: "success" | "warning" | "danger",
): never {
  redirect(
    `/account/submissions/${id}?tone=${tone}&message=${encodeURIComponent(message)}`,
  );
}
