const brandRequest = {
    approved:1,
    rejected:2,
    pending:3,
    all:0
}
const brandRequestFilter = [
    {
      id: 0,
      name: "All Brands",
    },
    { id: 2, name: "Denied Brands" },
    { id: 1, name: "Allowed Brands" },
    { id: 3, name: "Pending Brands" },
  ]
export {
    brandRequest,
    brandRequestFilter
}