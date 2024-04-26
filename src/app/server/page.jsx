import { auth } from "../../../auth";

export default async function Page() {
  const session = await auth();
  if (!session) return <div> Not Authenticated</div>;

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
