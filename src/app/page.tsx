import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";

const Dashboard = async () => {
  const session = await requireAuth();
  const data = await caller.getUsers();

  return (
    <div>
      Protected server component
      <div>{JSON.stringify(data, null, 2)}</div>
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
