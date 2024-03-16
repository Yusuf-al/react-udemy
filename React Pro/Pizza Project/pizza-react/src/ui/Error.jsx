import LinkButton from "./LinkButton";

function Error() {
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>%MESSAGE%</p>
      <LinkButton to="-1"> &larr; Go back </LinkButton>
    </div>
  );
}

export default Error;
