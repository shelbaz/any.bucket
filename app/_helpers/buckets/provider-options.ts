export const providerOptions = [
  { value: "s3", label: "AWS S3" },
  { value: "cloudflare", label: "Cloudflare R2" },
  { value: "wasabi", label: "Wasabi" },
  { value: "minio", label: "Minio" },
  { value: "backblaze", label: "Backblaze B2" },
  { value: "other", label: "Other" },
];

export const getProviderLabel = (provider: string) => {
  return providerOptions.find((o) => o.value === provider)?.label ?? "";
};
