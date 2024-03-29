import { ModelImpl, ModelHost, RendererHost, RuntimeComponentTreeDestroyEvent, ElementChangeEvent } from "@tenon/engine";
import {
  TenonEvent, IMaterialEventMeta, registerCommonHooks,
  IMaterialInternalEventMeta, createTenonEvent,
  useComponentLifeCycle, TenonComponentLifeCycle,
} from "@tenon/material-foundation";
import { Bridge } from "@tenon/shared";
import { IMaterialDragFeature } from "@/features/material-drag";
import React, { FC, useCallback, useEffect, useRef } from "react";
import { DATA_RUNTIME_TREE_ID, IComposeViewFeature } from "../compose-view.interface";
import { TenonComposeView } from "../compose-view.material";
import { Logger } from "@/utils/logger";
import "../style/compose-view.scss";

export const ComposeViewReact: FC<{
  setStyle?: React.CSSProperties;
  key?: number;
  isEmpty: boolean;
  composeViewHandler: IComposeViewFeature;
  materialEditable?: boolean;
  _bridge: Bridge<Record<string, any>>;
  runtimeTree: ModelImpl[ModelHost.Tree];
  __tenon_material_instance__: TenonComposeView;
  __tenon_event_meta__: (IMaterialEventMeta | IMaterialInternalEventMeta)[];
}> = (props) => {
  const {
    setStyle,
    _bridge,
    isEmpty,
    runtimeTree,
    composeViewHandler,
    children,
    materialEditable,
    __tenon_event_meta__,
    __tenon_material_instance__,
  } = props;
  const rootRef = useRef<HTMLElement | null>(null);
  const materialDrag = useRef<IMaterialDragFeature | null>(null);
  useEffect(() => {
    rootRef.current && _bridge.run(ElementChangeEvent, rootRef.current)
  }, [rootRef]);

  registerCommonHooks(RendererHost.React, __tenon_event_meta__, _bridge);
  useComponentLifeCycle(RendererHost.React, TenonComponentLifeCycle.Mount, () => {
    composeViewHandler.getMaterialDrag().then((service) => {
      materialDrag.current = service;
    });
  });

  const clickHandler = useCallback((e) => {
    Logger.log(__tenon_material_instance__.name, createTenonEvent("onClick"), e);
  }, []);
  const doubleClickHandler = useCallback((e) => {
    Logger.log(
      __tenon_material_instance__.name,
      createTenonEvent("onDoubleClick"),
      e
    );
  }, []);
  _bridge.register(createTenonEvent("onClick"), clickHandler);
  _bridge.register(createTenonEvent("onDoubleClick"), doubleClickHandler);

  useComponentLifeCycle(RendererHost.React, TenonComponentLifeCycle.UnMount, () => {
    _bridge.unRegister(createTenonEvent("onClick"), clickHandler);
    _bridge.unRegister(createTenonEvent("onDoubleClick"), doubleClickHandler);
    _bridge.run(RuntimeComponentTreeDestroyEvent);
  });

  const handleDragEnter = useCallback((e) => {
    composeViewHandler?.bridge.run("onDragEnter", e);
  }, []);

  const onDragEnterHandler = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.persist();
    if (e.target !== rootRef.current) return;
    handleDragEnter(e);
  }, []);

  const onDragOverHandler = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  }, []);

  const onDragLeaveHandler = useCallback((e: React.DragEvent<HTMLElement>) => {
    if (e.target !== rootRef.current) return;
    composeViewHandler?.bridge.run('onDragLeave', e.nativeEvent)
  }, []);

  const onDropHandler = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.persist();
    composeViewHandler?.bridge.run('onDrop', e.nativeEvent)
  }, []);

  return (
    isEmpty
      ? <section
        ref={rootRef}
        style={setStyle}
        className={
          [
            !!materialEditable ? "editable" : "",
            "empty-view-container",
          ].join(" ").trim()
        }
        onDragEnter={onDragEnterHandler}
        onDragOver={onDragOverHandler}
        onDragLeave={onDragLeaveHandler}
        onDrop={onDropHandler}
        {
          ...{
            [DATA_RUNTIME_TREE_ID]: runtimeTree.id,
          }
        }
      >
        { materialEditable && 'React: 拖入物料以生成组件' }
      </section >
      : <section
        ref={rootRef}
        style={setStyle}
        className={
          [
            !!materialEditable ? "editable" : "",
            "view-container",
          ].join(" ").trim()
        }
        onDragEnter={onDragEnterHandler}
        onDragOver={onDragOverHandler}
        onDragLeave={onDragLeaveHandler}
        onDrop={onDropHandler}
        {
          ...{
            [DATA_RUNTIME_TREE_ID]: runtimeTree.id,
          }
        }
      >
        {children}
      </section >
  ) as ReturnType<FC<{
    style?: React.CSSProperties;
    isEmpty: boolean;
    composeViewHandler: IComposeViewFeature;
    bridge: Bridge<Record<TenonEvent<string>, any>>;
    runtimeTree: ModelImpl[ModelHost.Tree];
    __tenon_material_instance__: TenonComposeView;
    __tenon_event_meta__: (IMaterialEventMeta | IMaterialInternalEventMeta)[];
  }>>;
};
