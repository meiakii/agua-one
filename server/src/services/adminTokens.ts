import crypto from "crypto";

const adminTokens = new Set<string>();

export const createAdminToken = (): string => {
  const token = crypto.randomUUID();
  adminTokens.add(token);
  return token;
};

export const revokeAdminToken = (token: string): void => {
  adminTokens.delete(token);
};

export const isAdminTokenValid = (token: string): boolean => {
  return adminTokens.has(token);
};
