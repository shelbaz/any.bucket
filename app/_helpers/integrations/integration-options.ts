export const integrationDetails = [
  {
    value: "openai",
    label: "OpenAI",
    description: "Enable generating text, images, chat, and more with AI.",
  },
];

export const integrationOptions = integrationDetails.map((i) => ({
  value: i.value,
  label: i.label,
}));

export const getIntegrationDetails = (value: string) => {
  return integrationDetails.find((i) => i.value === value);
};
