import CustomForm from "@/components/CustomForm";
import Logout from "@/components/Logout";

export default function Home() {
  return (
    <main>
      <h1>Dashboard</h1>
      <Logout />
      {/* <UploadFile /> */}
      <CustomForm />
    </main>
  );
}
