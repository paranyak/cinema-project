// @flow
import { keys } from "ramda";

const ELEMENT_SEPARATOR = "__",
  MODIFIER_SEPARATOR = "_";

export const selector = (str: string) =>
  str
    .split(" ")
    .map(c => "." + c)
    .join("");

const getBEMPAth = ({ b, e, m }) => {
  const base = e ? [b, e].join(ELEMENT_SEPARATOR) : b;

  return String(
    [base, ...m.map(modifier => [base, modifier].join(MODIFIER_SEPARATOR))]
      .join(" ")
      .trim()
  );
};

export default (b: string) => {
  return (
    elementName?: string | Array<string> | { [string]: any },
    modifiers?: Array<string> | { [string]: any } = {}
  ) => {
    let e, m;

    if (typeof elementName === "string") {
      e = elementName;
    } else {
      modifiers = elementName || {};
    }

    if (Array.isArray(modifiers)) {
      m = modifiers;
    } else {
      m = keys(modifiers).filter(modifier => modifiers[modifier]) || [];
    }

    return getBEMPAth({ b, e, m });
  };
};
