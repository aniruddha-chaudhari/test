import { client } from "@repo/prisma/client";


export default async function Home() {
  const users = await client.user.findFirst();
  return <div>
    <h1>Users</h1>
    <ul>
       <li key={users?.id}>{users?.username}</li>
    </ul>
  </div>
}