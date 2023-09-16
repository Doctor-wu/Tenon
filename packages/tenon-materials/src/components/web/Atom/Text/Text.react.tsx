import React, { FC, useCallback, useEffect, useRef } from 'react';
import { shallowRef } from 'vue';
import { TextProps } from './interface';
import { TenonComponentLifeCycle, createTenonEvent, useComponentLifeCycle, registerCommonHooks } from '../../..';
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
  useEffect(() => {
    reactiveRootRef.value = root.current;
  });
  registerCommonHooks(RendererHost.React, __tenon_event_meta__, reactiveRootRef, bridge);
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
  props.bridge.register(createTenonEvent("onClick"), clickHandler);
  props.bridge.register(createTenonEvent("onDoubleClick"), doubleClickHandler);

  useComponentLifeCycle(RendererHost.React, TenonComponentLifeCycle.UnMount, () => {
    props.bridge.unRegister(createTenonEvent("onClick"), clickHandler);
    props.bridge.unRegister(createTenonEvent("onDoubleClick"), doubleClickHandler);
  });
  return (
    <>
      <span className="tenon-material-text" ref={root} style={style || __tenon_material_instance__.propMeta.style.default}>
        React: {text || __tenon_material_instance__.propMeta.text.default}
      </span>
    </>
  ) as ReturnType<FC<TextProps<React.CSSProperties>>>;
}
