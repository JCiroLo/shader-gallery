import { withNaming } from "@bem-react/classname";

const clazz = withNaming({ e: "__", m: "--", v: "-" });

clazz("block", "elem")({ theme: "default" });

export default clazz;
