import React from 'react';

function stripMotionProps(props) {
  const {
    initial,
    animate,
    exit,
    transition,
    whileHover,
    whileTap,
    variants,
    viewport,
    ...rest
  } = props;
  return rest;
}

function createMotionTag(Tag) {
  return React.forwardRef(function MotionTag(props, ref) {
    return <Tag ref={ref} {...stripMotionProps(props)} />;
  });
}

export const motion = new Proxy(
  {},
  {
    get: (_, tag) => createMotionTag(tag),
  },
);
