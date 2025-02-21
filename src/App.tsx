import { FC } from "react";
import AppRouter from "./router/appRouter";
import { CartProvider } from "./context/cartContext";

const App: FC = () => {
  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  );
};

export default App;
