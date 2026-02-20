import Image from "next/image";
import HomeClient from "@/components/Homeclient";
import { getSession } from "@/lib/getsession";

export default async function Home() {
  const session = await getSession();
  console.log("Session in Home:", session);
  return (
    <>
      <HomeClient />
    </>
  );
}
