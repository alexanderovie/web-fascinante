import * as React from "react";

type PossibleRef<T> = React.Ref<T> | undefined;

/**
 * Set a ref to a value, calling a function if it's a function ref
 */
function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref != null) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

/**
 * A utility to compose multiple refs together
 * Accepts refs as function arguments or an array
 */
export function useComposedRefs<T>(...refs: PossibleRef<T>[]) {
  return React.useCallback((node: T) => {
    for (const ref of refs) {
      setRef(ref, node);
    }
  }, refs);
}


