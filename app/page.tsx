import { Container } from "./components/shared/container";
import { TodosList } from "./components/shared/todos-list";
const Page = () => {
  return (
    <Container>
      <TodosList />
    </Container>
  );
};

export default Page;
