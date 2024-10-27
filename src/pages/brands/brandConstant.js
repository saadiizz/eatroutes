const brandFilter = [
  {
    id: -1,
    name: "All Brands",
  },
  { id: 2, name: "Locked Brands" },
  { id: 1, name: "Allowed Brands" },
  { id: 3, name: "Requested Brands" },
];
const leadFilter = [
  {
    id: 3,
    name: "All Leads",
  },
  {
    id: -1,
    name: "UNVETTED",
  },
  { id: 2, name: "DEAD" },
  { id: 4, name: "Country" },
  { id: 5, name: "Sale Region" },
  { id: 6, name: "Annual Turnover" },
  // {   id:1,
  //     name:"Allowed Brands"
  // },
  // {   id:3,
  //     name:"Requested Brands"
  // }
];

const customerFilter = [
  { id: 1, name: "All" },
  { id: 2, name: "Country" },
  { id: 3, name: "Sale Region" },
  { id: 4, name: "Annual Turnover" },
];

const brandEnum = {
  pendingrequest: 3,
  availableRequest: 0,
  availableRequest1: 2,
  approved: 1,
};
export { brandFilter, brandEnum, leadFilter, customerFilter };
