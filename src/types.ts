export type ItemScope = "domain" | "global";

export type ClipboardItem = {
  id: string;
  scope: ItemScope;
  domain: string | null;
  title: string;
  content: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
  lastCopiedAt: string | null;
  commandEnabled: boolean;
  commandTrigger: string | null;
};
