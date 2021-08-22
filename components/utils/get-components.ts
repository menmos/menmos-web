import * as React from "react";

interface Override {
  props: { [key: string]: unknown };
  component: React.FunctionComponent;
}

export type ComponentProperties<T extends Components, K extends keyof T> = {
  [component in K]?: Partial<Override>;
};
export type OverriddenProperties<T extends Components, K extends keyof T> = {
  [component in K]: Override;
};

export type Components = { [component: string]: React.FunctionComponent };

export function getComponents<T extends Components, K extends keyof T>(
  defaultComponents: T,
  overrides?: ComponentProperties<T, K>
): OverriddenProperties<T, K> {
  // eslint-disable-next-line unicorn/no-array-reduce, unicorn/prefer-object-from-entries
  return Object.keys(defaultComponents).reduce((components, name) => {
    const override = overrides && overrides[name as K];
    return {
      ...components,
      [name]: {
        component: override?.component || defaultComponents[name],
        props: override?.props,
      },
    };
  }, {} as OverriddenProperties<T, K>);
}
