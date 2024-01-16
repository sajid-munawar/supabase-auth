import Logout from "./components/Logout";
import UploadFile from "./components/UploadFile";

export default function Home() {
  return (
    <main>
      <h1>Dashboard</h1>
      <Logout />
      <UploadFile />
    </main>
  );
}
