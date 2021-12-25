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


