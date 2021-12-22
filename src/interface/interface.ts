export interface Myjson {
  data:   Data;
  errors: null;
}

export interface Data {
  tabs:    string[];
  tabdata: Tabdata;
  plugins: { [key: string]: Plugin };
}

export interface Plugin {
  title:       string;
  description: string;
}

// export interface Tabdata {
//   tab1: Tab;
//   tab2: Tab;
//   tab3: Tab;
// }

export interface Tabdata {
  [key: string]: Tab
}

export interface Tab {
  title:    string;
  icon:     string;
  active:   string[];
  disabled: string[];
  inactive: string[];
}


// export const DefaultMyjson : Myjson = {
//   data: {
//     tabs: [],
//     tabdata: {
//       tab1: {
//         title: "",
//         icon: "",
//         active: [],
//         disabled: [],
//         inactive: [],
//       },
//       tab2: {
//         title: "",
//         icon: "",
//         active: [],
//         disabled: [],
//         inactive: [],
//       },
//       tab3: {
//         title: "",
//         icon: "",
//         active: [],
//         disabled: [],
//         inactive: [],
//       },
//     },
//     plugins: {
//       plugin1: {
//         title: "",
//         description:
//           "",
//       },
//       plugin2: {
//         title: "",
//         description:
//           "",
//       },
//       plugin3: {
//         title: "",
//         description:
//           "",
//       },
//       plugin4: {
//         title: "",
//         description:
//           "",
//       },
//       plugin5: {
//         title: "",
//         description:
//           "",
//       },
//       plugin6: {
//         title: "",
//         description:
//           "",
//       },
//       plugin7: {
//         title: "",
//         description:
//           "",
//       },
//       plugin8: {
//         title: "",
//         description:
//           "",
//       },
//       plugin9: {
//         title: "",
//         description:
//           "",
//       },
//       plugin10: {
//         title: "",
//         description:
//           "",
//       },
//       plugin11: {
//         title: "",
//         description:
//           "",
//       },
//       plugin12: {
//         title: "",
//         description:
//           "",
//       },
//       plugin13: {
//         title: "",
//         description:
//           "",
//       },
//     },
//   },
//   errors: null,
// };


