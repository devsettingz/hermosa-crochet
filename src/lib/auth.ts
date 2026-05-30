import bcrypt from "bcryptjs";

const ADMIN_PASSWORD_HASH = bcrypt.hashSync(
  process.env.ADMIN_PASSWORD || "hermosa2026",
  10
);

export async function verifyAdminPassword(password: string): Promise<boolean> {
  return bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("hermosa_admin") === "true";
}

export function setAdminAuth(value: boolean): void {
  if (typeof window === "undefined") return;
  if (value) {
    localStorage.setItem("hermosa_admin", "true");
  } else {
    localStorage.removeItem("hermosa_admin");
  }
}