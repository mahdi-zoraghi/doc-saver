import { useParams } from "react-router-dom";
import startCase from "lodash/startCase";

import { Editor } from "../components";
import { useEffect, useState } from "react";
import localforage from "localforage";

const Doc = () => {
  const [blocks, setBlocks] = useState<null | []>(null);

  const params = useParams();

  const docKey = params.docId as string;
  const title = startCase(docKey);

  useEffect(() => {
    document.title = title;

    localforage.getItem(docKey).then((value: any) => setBlocks(value.blocks));
  }, [docKey, title]);

  return (
    <>
      {blocks !== null && (
        <Editor
          docKey={params.docId as string}
          blocks={blocks}
          setBlocks={setBlocks}
        />
      )}
    </>
  );
};

export default Doc;
