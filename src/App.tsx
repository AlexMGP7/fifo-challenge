import { FC } from "react";
import ThemeContainer from "./components/themeContainer";
import AppRouter from "./router/appRouter";

const App: FC = () => {
  return (
    <ThemeContainer>
      <AppRouter />
    </ThemeContainer>
  );
};

export default App;
