import CustomForm from "@/components/CustomForm";
import Logout from "@/components/Logout";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/submit-details">Submit credentials</Link>
      <h1>Dashboard</h1>
      <Logout />
      {/* <UploadFile /> */}
      <CustomForm />
    </main>
  );
}
