import { logout } from "../../_lib/session";

export async function GET() {
  await logout();
}
