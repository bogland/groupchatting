import React, { useEffect, useState } from "react";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";

type Props = {};

const toastui = (props: Props) => {
  const [state, setState] = useState<any>({ Editor: null });
  useEffect(() => {
    loadEditor();
  }, []);

  const loadEditor = async () => {
    const { Editor } = await import("@toast-ui/react-editor");
    state.Editor = Editor;
    setState((v) => ({ ...v }));
  };

  return (
    <>
      <div>
        {state.Editor && (
          <state.Editor
            initialValue="hello react editor world!"
            previewStyle="vertical"
            height="600px"
            initialEditType="markdown"
            useCommandShortcut={true}
          />
        )}
      </div>
    </>
  );
};

export default toastui;
