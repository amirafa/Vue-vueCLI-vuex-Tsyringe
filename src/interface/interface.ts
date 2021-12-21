interface Myjson {
  data: Data,
  errors: null;
}

interface Data {
  tabs: Array<string>,
  tabdata: {tab1:Tabs,tab2:Tabs,tab3:Tabs},
  plugins: Plugins
}

interface Tabs {
  title: string,
  icon: string,
  active: Array<string>,
  disabled: Array<string>,
  inactive: Array<string>,
}

interface Plugins {
  plugin1: Singleplugin,
  plugin2: Singleplugin,
  plugin3: Singleplugin,
  plugin4: Singleplugin,
  plugin5: Singleplugin,
  plugin6: Singleplugin,
  plugin7: Singleplugin,
  plugin8: Singleplugin,
  plugin9: Singleplugin,
  plugin10: Singleplugin,
  plugin11: Singleplugin,
  plugin12: Singleplugin,
  plugin13: Singleplugin,
}

interface Singleplugin {
  title: string,
  description: string
}

const DefaultMyjson : Myjson = {
  data: {
    tabs: [],
    tabdata: {
      tab1: {
        title: "",
        icon: "",
        active: [],
        disabled: [],
        inactive: [],
      },
      tab2: {
        title: "",
        icon: "",
        active: [],
        disabled: [],
        inactive: [],
      },
      tab3: {
        title: "",
        icon: "",
        active: [],
        disabled: [],
        inactive: [],
      },
    },
    plugins: {
      plugin1: {
        title: "",
        description:
          "",
      },
      plugin2: {
        title: "",
        description:
          "",
      },
      plugin3: {
        title: "",
        description:
          "",
      },
      plugin4: {
        title: "",
        description:
          "",
      },
      plugin5: {
        title: "",
        description:
          "",
      },
      plugin6: {
        title: "",
        description:
          "",
      },
      plugin7: {
        title: "",
        description:
          "",
      },
      plugin8: {
        title: "",
        description:
          "",
      },
      plugin9: {
        title: "",
        description:
          "",
      },
      plugin10: {
        title: "",
        description:
          "",
      },
      plugin11: {
        title: "",
        description:
          "",
      },
      plugin12: {
        title: "",
        description:
          "",
      },
      plugin13: {
        title: "",
        description:
          "",
      },
    },
  },
  errors: null,
};

export { Myjson,DefaultMyjson };
