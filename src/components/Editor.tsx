import React, { useRef, useCallback, useEffect } from "react";
import { createReactEditorJS } from "react-editor-js";
import localforage from "localforage";

import { EDITOR_JS_TOOLS } from "../constants/editor-constants";

const ReactEditorJS = createReactEditorJS();

interface Props {
  docKey: string;
  blocks: [];
  setBlocks: React.Dispatch<React.SetStateAction<null | []>>;
}

function Editor({ docKey, blocks, setBlocks }: Props) {
  const editorJS = useRef<any>(null);

  const handleInitialize = useCallback((instance) => {
    editorJS.current = instance;
  }, []);

  const handleSave = useCallback(async () => {
    const savedData = await editorJS.current.save();
    setBlocks(savedData);
    localforage.setItem(docKey, blocks);
  }, [blocks, docKey, setBlocks]);

  useEffect(() => {
    const intervalId = setInterval(handleSave, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, [handleSave]);

  return (
    <div className="editor-container">
      <div className="editor-wrapper">
        <ReactEditorJS
          tools={EDITOR_JS_TOOLS}
          defaultValue={{
            time: 1635603431943,
            blocks,
          }}
          onInitialize={handleInitialize}
          holder="editor"
        >
          <div id="editor" />
        </ReactEditorJS>
      </div>
    </div>
  );
}

export default Editor;
