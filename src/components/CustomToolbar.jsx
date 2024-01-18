import { GridToolbarContainer} from "@mui/x-data-grid";
import { GridToolbarColumnsButton } from "@mui/x-data-grid";
import { GridToolbarFilterButton } from "@mui/x-data-grid";
import { GridToolbarDensitySelector } from "@mui/x-data-grid";
import { GridToolbarExport } from "@mui/x-data-grid";

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  export default CustomToolbar; 
  