function User({ name, role }: { name: string; role?: string }) {
  return (
    <>
      <h3>User: {name}</h3>
      <h5>{role ? role : "Never had a job"}</h5>
    </>
  );
}

export default User;
