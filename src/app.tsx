/**
 * @summary used for ui.html
 */
import { CSSProperties, FC, StrictMode, useCallback } from "react";
import { createRoot } from "react-dom/client";

const app = document.querySelector("#app")!; // たぶん#appあるだろうという

const App: FC = () => {
  const handleOnClick = useCallback(() => {}, []);
  const handleOnSubmit = useCallback(() => {}, []);

  return (
    <>
      <form>
        <input type="text" name="" id="" />

        <div>
          <label id="outputType" htmlFor="">
            <input type="radio" name="" id="" />
          </label>
        </div>
      </form>
    </>
  );
};

createRoot(app).render(
  <StrictMode>
    <App />
  </StrictMode>
);
