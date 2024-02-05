import React, { FC, useCallback, useRef } from 'react';
import { shallowRef } from 'vue';
import { TextProps } from './interface';
import {
  TenonComponentLifeCycle,
  createTenonEvent,
  useComponentLifeCycle,
  registerCommonHooks
} from '@tenon/material-foundation';
import { RendererHost } from '@tenon/engine';
import "./Text.scss";

export const TextReact: FC<TextProps<React.CSSProperties>> = (props) => {
  const {
    style,
    text,
    bridge,
    __tenon_event_meta__,
    __tenon_material_instance__,
  } = props;
  const root = useRef<HTMLSpanElement>(null);
  const reactiveRootRef = shallowRef<HTMLSpanElement | null>(null);
  const clickHandler = useCallback((e) => {
    console.log(__tenon_material_instance__.name, createTenonEvent("onClick"), e);
  }, []);
  const doubleClickHandler = useCallback((e) => {
    console.log(
      __tenon_material_instance__.name,
      createTenonEvent("onDoubleClick"),
      e
    );
  }, []);

  useComponentLifeCycle(RendererHost.React, TenonComponentLifeCycle.Mount, () => {
    reactiveRootRef.value = root.current;
    bridge.register(createTenonEvent("onClick"), clickHandler);
    bridge.register(createTenonEvent("onDoubleClick"), doubleClickHandler);
  });

  registerCommonHooks(RendererHost.React, __tenon_event_meta__, reactiveRootRef, bridge);

  useComponentLifeCycle(RendererHost.React, TenonComponentLifeCycle.UnMount, () => {
    reactiveRootRef.value = null;
    bridge.unRegister(createTenonEvent("onClick"), clickHandler);
    bridge.unRegister(createTenonEvent("onDoubleClick"), doubleClickHandler);
  });
  return (
    <>
      <span className="tenon-material-text" ref={root} style={style || __tenon_material_instance__.propMeta.style.default}>
        {text || `React: ${props.__tenon_material_instance__.propMeta.text.default}`}
      </span>
    </>
  ) as ReturnType<FC<TextProps<React.CSSProperties>>>;
}
