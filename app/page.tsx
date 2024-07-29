import { getUser } from "@/lib/action";

export default async function Home() {
  getUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home Page</h1>
    </main>
  );
}
