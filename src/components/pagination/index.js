import { Pagination } from "@mui/material";

function CustomPagination(props) {
  return (
    <Pagination
      className="pagination-wrapper"
      count={props.count ? props.count : 1}
      page={props.page}
      onChange={props.onChange}
    />
  );
}

export default CustomPagination;
