import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "./utils/auth";

export default async function Home() {
  const session = await auth();
  const userEmail = session?.user?.email;
  const userName = session?.user?.name;

  if (session?.user) {
    return (
      <>
        <p>Hello {userName}</p>
        <p>Signed in as {userEmail}</p>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button>Sign out</button>
        </form>
        <img src={session.user.image as string | undefined} />
      </>
    );
  }
  return (
    <>
      <p>Not signed in.</p>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button>Sign in</button>
      </form>
    </>
  );
}
