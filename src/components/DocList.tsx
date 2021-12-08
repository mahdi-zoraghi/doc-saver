import { useEffect, useState } from "react";
import localforage from "localforage";
import startCase from "lodash/startCase";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const DocList = () => {
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const [docList, setDocList] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      localforage.keys().then((keys) => {
        setDocList(keys);
      });
    })();
  }, [needsRefresh]);

  const handleDeleteDoc = async (docId: string) => {
    await localforage.removeItem(docId);
    setNeedsRefresh(!needsRefresh);
  };

  return (
    <div className="doc-list d-flex flex-justify-center">
      <ul>
        {docList.map((doc) => {
          return (
            <li key={doc} className="m-10 d-flex">
              <AiFillDelete
                className="icon"
                fontSize={20}
                color="red"
                onClick={() => handleDeleteDoc(doc)}
              />
              <Link to={`/doc/${doc}`} className="ml-10">
                {startCase(doc)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DocList;
