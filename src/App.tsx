import { FC } from "react";
import ThemeContainer from "./components/themeContainer";
import AppRouter from "./router/appRouter";
import { CartProvider } from "./context/cartContext";

const App: FC = () => {
  return (
    <CartProvider>
      <ThemeContainer>
        <AppRouter />
      </ThemeContainer>
    </CartProvider>
  );
};

export default App;
