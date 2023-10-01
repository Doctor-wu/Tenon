import { ModelImpl, ModelHost, RendererHost } from "@tenon/engine";
import { ModelChange, ModelChangeNotification, TenonEditor } from "@/core";
import { Logger } from "@/utils/logger";
import React, { FC, useEffect, useRef, useState } from "react";
import "./style/editor-style.scss";

export const EditorViewReact: FC<{
  editor: TenonEditor;
}> = (props) => {
  const editorView = useRef<HTMLDivElement | null>(null);
  const [runtimeTree, setRuntimeTree] = useState<ModelImpl[ModelHost] | null>(
    props.editor.context.dataEngine.root
  );
  const [, setRenderTick] = useState(false);

  useEffect(() => {
    const cancel = props.editor.context.on(
      ModelChange,
      async (noti: ModelChangeNotification<ModelImpl[ModelHost]>) => {
        setRenderTick((tick) => !tick);
        if (noti.payload.id === runtimeTree?.id) {
          return;
        }
        Logger.log("ModelChange", noti.payload);
        // 根节点不可拖拽
        noti.payload.draggable = false;
        cancel();
        setRuntimeTree(noti.payload);
      }
    );
    return cancel;
  }, [runtimeTree]);
  return (
    <section className="editor-view-wrapper">
      <div id="tenon-editor" ref={editorView}>
        {
          runtimeTree && props.editor.context.rendererManager
            .getRenderer(runtimeTree.name)
            .render(RendererHost.React, runtimeTree, {
              style: {
                minHeight: '680px',
              },
            })
        }
      </div>
    </section>
  ) as ReturnType<FC<{ editor: TenonEditor }>>;
}
