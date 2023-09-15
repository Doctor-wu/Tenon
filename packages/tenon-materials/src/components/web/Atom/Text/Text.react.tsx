import React, { FC, useEffect, useRef } from 'react';
import { TextProps } from './interface';
import { createTenonEvent, useEventMeta } from '../../..';
import { RendererHost } from '@tenon/engine';

export const TextReact: FC<TextProps<React.CSSProperties>> = (props) => {
  const {
    style,
    text,
    bridge,
    __tenon_event_meta__,
    __tenon_material_instance__,
  } = props;
  const root = useRef<HTMLSpanElement>(null);
  useEventMeta(RendererHost.React, __tenon_event_meta__, root, bridge);
  useEffect(() => {
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
  }, []);
  return (
    <>
      <span ref={root} style={style}>{text}</span>
    </>
  ) as ReturnType<FC<TextProps<React.CSSProperties>>>;
}
