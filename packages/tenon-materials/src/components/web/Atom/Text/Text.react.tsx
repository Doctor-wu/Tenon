import React, { FC, useEffect, useRef } from 'react';
import { shallowRef } from 'vue';
import { TextProps } from './interface';
import { TenonComponentLifeCycle, createTenonEvent, useComponentLifeCycle, useEventMeta } from '../../..';
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
  useEventMeta(RendererHost.React, __tenon_event_meta__, reactiveRootRef, bridge);
  useComponentLifeCycle(RendererHost.React, TenonComponentLifeCycle.Mount, () => {
    bridge.register(createTenonEvent("onClick"), (e) => {
      console.log(__tenon_material_instance__.name, createTenonEvent("onClick"), e);
    });
    bridge.register(createTenonEvent("onDoubleClick"), (e) => {
      console.log(
        __tenon_material_instance__.name,
        createTenonEvent("onDoubleClick"),
        e
      );
    });
  });
  return (
    <>
      <span className="tenon-material-text" ref={root} style={style || __tenon_material_instance__.propMeta.style.default}>
        React: {text || __tenon_material_instance__.propMeta.text.default}
      </span>
    </>
  ) as ReturnType<FC<TextProps<React.CSSProperties>>>;
}
