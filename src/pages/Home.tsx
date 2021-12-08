import { useState } from "react";
import { Button } from "react-rainbow-components";

import { NewDoc, DocList } from "../components";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  document.title = "Home";

  return (
    <div className="p-10">
      <Button
        id="button-1"
        variant="neutral"
        label="New Doc"
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <NewDoc isOpen={isOpen} setIsOpen={setIsOpen} />
      <DocList />
    </div>
  );
};

export default Home;
