import { RegisterForm } from "@/features/auth/components/register-form";
import { requereUnauth } from "@/lib/auth-utils";

const Page = async () => {
  await requereUnauth();
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default Page;
