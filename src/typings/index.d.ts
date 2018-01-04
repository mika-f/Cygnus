declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

interface NodeRequire {
  context(arg1: string, arg2: boolean, arg3: RegExp);
}
