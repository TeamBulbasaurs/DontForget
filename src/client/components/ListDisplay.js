import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: '#171E25',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const styles = theme => ({
    root: {
      padding: '10px',
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    // table: {
    //   width: '100%',
    //   minWidth: '100%',
    // },
  });

class ListDisplay extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
          <Paper className="tableContainer">
            <Table className="displayTable" onClick={()=>{this.props.handleSetId(this.props.details.listId); this.props.handleSelectList()}}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>{this.props.details.listName}</CustomTableCell>
                  <CustomTableCell align="right">{this.props.details.listId}</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                    <TableRow className="displayTableRow">
                      <CustomTableCell component="th" scope="row">
                        {this.props.details.notes}
                      </CustomTableCell>
                      <CustomTableCell align="right"></CustomTableCell>
                    </TableRow>
              </TableBody>
            </Table>
          </Paper>
        )
    }
}

export default withStyles(styles)(ListDisplay)
// export default withStyles(styles)(function ListDisplay(props) {
//     console.log("hello this worked", props.details)
//     return (
//         <Table className="displayTable">
//           <TableHead>
//             <TableRow>
//               <CustomTableCell>{props.details.listName}</CustomTableCell>
//               <CustomTableCell align="right">{props.details.listId}</CustomTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//                 <TableRow className="displayTableRow">
//                   <CustomTableCell component="th" scope="row">
//                     {props.details.notes}
//                   </CustomTableCell>
//                 </TableRow>
//           </TableBody>
//         </Table>
//     )
// }
// )