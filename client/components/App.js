import React from 'react';
import { Segment, Dropdown, Grid, Header, Icon, Button } from 'semantic-ui-react';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.options = [
      { value: "easy", text: "Easy" },
      { value: "medium", text: "Medium" },
      { value: "impossible", text: "Impossible" },
      { value: "players", text: "Play against a friend" }
    ];
    this.cross = "x";
    this.circle = "circle outline";
    this.currentPlayer = "x";
    this.isCellClicked = false;

    this.state = {
      level: "impossible",
      grid: new Array(3).fill('').map(()=>new Array(3).fill('')),
      winner: ""
    };

    this.changeLevel = this.changeLevel.bind(this);
    this.resetGrid = this.resetGrid.bind(this);
    this.buildGrid = this.buildGrid.bind(this);
    this.cellClicked = this.cellClicked.bind(this);
    this.isGameOver = this.isGameOver.bind(this);
    this.getNextCell = this.getNextCell.bind(this);
  }

  componentDidUpdate(){
    let { level, grid } = this.state;
    let currentPlayer = this.currentPlayer;
    if(level != "players" && this.isCellClicked) {
      setTimeout(() => {
        let cell = this.getNextCell(grid, 0, currentPlayer);
        this.cellClicked(cell.r, cell.c, false);
      });
    }
  }

  resetGrid() {
    let grid = new Array(3).fill('').map(()=>new Array(3).fill(''));
    this.currentPlayer = this.cross;
    this.isCellClicked = false;
    this.setState({grid, winner: ""});
  }

  changeLevel(level){
    this.resetGrid();
    this.setState({level});
  }

  cellClicked(row, col, isCellClicked) {
    let { grid, winner } = this.state;
    if(winner != "" || grid[row][col] != "") {
      return false;
    }
    grid[row][col] = this.currentPlayer;
    winner = this.isGameOver(grid);
    if(winner) {
      this.setState({winner});
      this.currentPlayer = this.cross;
      return false;
    } else {
      this.currentPlayer = (this.currentPlayer == this.cross) ? this.circle : this.cross;
      this.isCellClicked = isCellClicked;
      this.setState({grid});
    }

  }

  getNextCell(gridArr, depth, player) {
    let gridStatus = this.isGameOver(gridArr);
    if(gridStatus == false) {

      let values = [];

      for(let r=0; r<3; r++) {
        for(let c=0; c<3; c++) {
          let grid = JSON.parse(JSON.stringify(gridArr));
          if(grid[r][c] !== '') continue;
          grid[r][c] = player;
          let swapedPlayer = (player == this.cross) ? this.circle : this.cross;
          let value = this.getNextCell(grid, depth + 1, swapedPlayer);
          values.push({
            value,
            cell: { r, c }
          });
        }
      }
      let {level} = this.state;
      if(player == this.circle) {
        let max;
        values = values.sort((a,b)=>a.value<b.value);
        if(level == "impossible") {
          max = values[0];
        } else if (level == "medium") {
          let mid = Math.floor(values.length/2);
          max = values[mid];
        } else {
          max = values[values.length-1];
        }
        if(depth == 0) {
          return max.cell;
        } else {
          return max.value;
        }
      } else {
        let min;
        values = values.sort((a,b)=>a.value>b.value);
        if(level == "impossible") {
          min = values[0];
        } else if (level == "medium") {
          let mid = Math.floor(values.length/2);
          min = values[mid];
        } else {
          min = values[values.length-1];
        }
        if(depth == 0) {
          return min.cell;
        } else {
          return min.value;
        }
      }
    }
    if(gridStatus == "draw") {
      return 0;
    } else if(gridStatus == this.cross) {
      return (depth - 10);
    } else if(gridStatus == this.circle) {
      return (10 - depth);
    }

  }

  isGameOver(grid) {
    //Horizontal & Vertical
    for(let l=0; l<3; l++) {
      if(grid[l][0] == grid[l][1] && grid[l][1] == grid[l][2] && grid[l][2] != '') {
        return grid[l][0];
      }
      if(grid[0][l] == grid[1][l] && grid[1][l] == grid[2][l] && grid[2][l] != '') {
        return grid[0][l];
      }
    }
    //Diagonal
    if(grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2] && grid[2][2] != '') {
      return grid[0][0];
    } else if(grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0] && grid[2][0] != '') {
      return grid[0][2];
    }

    for(let r=0; r<3; r++) {
      for(let c=0; c<3; c++) {
        if(grid[r][c] == '') {
          return false
        }
      }
    }

    return "draw";
  }

  buildGrid() {
    let rows = 3,
        cols = 3,
        gridRows = [],
        { grid } = this.state;
    for(let r=0; r<rows; r++) {
      let gridCols = [];
      for(let c=0; c<cols; c++) {
        gridCols.push(
          <Grid.Column className="cursor-pointer" key={'col'+r+c} onClick={() => this.cellClicked(r, c, true)}>
            <Icon name={grid[r][c]} size="huge"/>
          </Grid.Column>
        );
      }
      gridRows.push(<Grid.Row key={'row'+r}>{gridCols}</Grid.Row>);
    }
    return (
      <Grid celled='internally' columns="equal">{gridRows}</Grid>
    );
  }

  render() {
    let { winner } = this.state;
    let gridContent, gridContentWinner;

    if(winner == "draw") {
      gridContentWinner = (
        <div className="app-grid_result">
          <div>
            <Icon name={this.cross} size="huge"/>
            <Icon name={this.circle} size="huge"/>
          </div>
          <h3>Draw!</h3>
        </div>
      );
    } else if(winner) {
      gridContentWinner = (
        <div className="app-grid_result">
          <Icon name={winner} size="massive"/>
          <h3>Winner!</h3>
        </div>
      );
    } else if (this.isCellClicked) {
      gridContentWinner = (
        <div className="app-grid_result"/>
      );
    }

    gridContent = this.buildGrid();

    return (
      <div className="app-container">
        <Header className="text-center" as='h3' content="Tic Tac Toe"/>
        <Segment className="app-segment">
          <div className="flex">
            <div>
              <Dropdown size="mini" onChange={(e, {value}) => this.changeLevel(value)} options={this.options} value={this.state.level}/>
            </div>
            <div className="text-right"><Icon name={this.currentPlayer}/> Turn</div>
          </div>
          <div className="app-grid">
            {gridContentWinner}
            {gridContent}
          </div>
          <Button className="app-segment_restart" fluid onClick={this.resetGrid}>Restart</Button>
        </Segment>
      </div>
    );
  }

}
