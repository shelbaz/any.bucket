export const integrationOptions = [{ value: "openai", label: "OpenAI" }];

export const getIntegrationLabel = (integration: string) => {
  return integrationOptions.find((o) => o.value === integration)?.label ?? "";
};
