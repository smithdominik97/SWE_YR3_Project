import returnDatabase from "../db/database";

export default function Home() {
  returnDatabase();

  return (
    <>
      <h1>Hello</h1>
    </>
  );
}
