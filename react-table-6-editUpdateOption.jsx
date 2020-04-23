import React, { Component } from "react";
import { render } from "react-dom";
import { Button } from "semantic-ui-react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

const cellWidth = 100;

const data = [
  { name: "ajeeb", place: "vettom", fees: 100 },
  { name: "kajal", place: "java cottage", fees: 300 },
  { name: "kajal", place: "java cottage", fees: 200 }
];

class SubnetTable extends Component {
  constructor(props) {
    super();
    console.log("PROOPS", props);
    this.state = {
      data: data,
      editRows: { 0: false, 1: false }
    };
    // this.renderEditable = this.renderEditable.bind(this);
  }
  state = {};

  renderEditable = cellInfo => {
    console.log("HII", cellInfo.original);
    const editable = this.isEditable(cellInfo.index);
    const cellColor = editable ? "#8ED1FC" : "";

    return (
      <div
        style={{ backgroundColor: cellColor }}
        contentEditable={editable}
        suppressContentEditableWarning={editable}
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };

  // componentDidUpdate(prevState) {
  //   if (prevState.editRows !== this.state.editRows) {
  //     this.renderEditable = this.renderEditable.bind(this);
  //   }
  // }

  editRow = cellInfo => {
    const editRows = { ...this.state.editRows };
    if (this.isEditable(cellInfo.index)) {
      editRows[cellInfo.index] = false;
    } else {
      editRows[cellInfo.index] = true;
    }
    this.setState({ editRows });
    this.renderEditable(cellInfo);
  };

  isEditable = index => {
    const { editRows } = this.state;
    return index in editRows ? editRows[index] : false;
  };

  render() {
    console.log("PP:", this.props, data, this.state);
    const columns = [
      {
        Header: "Name",
        accessor: "name",
        width: cellWidth,
        Cell: this.renderEditable
      },
      {
        Header: "Place",
        accessor: "place",
        width: cellWidth,
        Cell: this.renderEditable
      },
      {
        Header: "Fees",
        accessor: "fees",
        width: cellWidth,
        Cell: this.renderEditable
      },
      {
        id: "editUpdate",
        accessor: "edit",
        Cell: cellInfo => (
          <Button
            onClick={() => this.editRow(cellInfo)}
            content={this.isEditable(cellInfo.index) ? "Update" : "Edit"}
            size="mini"
            color={this.isEditable(cellInfo.index) ? "blue" : ""}
          />
        )
      }
    ];
    return (
      <ReactTable
        data={data}
        columns={columns}
        pageSizeOptions={[5, 6, 7, 8, 9, 10, 15, 20, 25, 50]}
        defaultPageSize={5}
        className="-striped -highlight"
        // style={{
        //   fontSize: "11px",
        //   color: "white",
        //   // fontWeight: "bold",
        //   background: "teal",
        // }}
        // className="ReactTable"
        // getTrProps={this.highlightRow}
      />
    );
  }
}

export default SubnetTable;
