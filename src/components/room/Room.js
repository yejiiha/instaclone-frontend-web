function Room({ unreadTotal }) {
  return (
    <h1>
      {unreadTotal === "0"
        ? "Name of the other person"
        : `${unreadTotal} messages`}
    </h1>
  );
}

export default Room;
