import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "../../components/nav.jsx";
import { auth } from "../../auth";
import { SignOut } from "../../components/auth-components";
import { config } from "@/middleware";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <Navbar></Navbar>
      <SignOut></SignOut>
      <p>Welcome {session?.user.name}!</p>
    </>
  );
}
