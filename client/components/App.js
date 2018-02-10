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
    this.counter = 0;

    this.state = {
      level: "players",
      player: "x",
      grid: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ],
      winner: ""
    };

    this.changeLevel = this.changeLevel.bind(this);
    this.resetGrid = this.resetGrid.bind(this);
    this.buildGrid = this.buildGrid.bind(this);

  }

  resetGrid() {
    let grid = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.counter = 0;
    this.setState({grid, winner: ""});
  }

  changeLevel(level){
    this.resetGrid();
    this.setState({level});
  }

  cellClicked(row, col) {
    this.counter ++;
    let { grid, player } = this.state;
    if(grid[row][col] != "") {
      return false;
    }
    grid[row][col] = player;
    let winner = this.validateGame(grid);
    if(winner) {
      this.resetGrid();
      this.setState({winner});
    } else {
      player = (player == this.cross) ? this.circle : this.cross;
      this.setState({grid, player});
    }
  }

  validateGame(grid) {
    if(this.counter < 3) {
      return false;
    }
    for(let l=0; l<3; l++) {
      if(grid[l][0] == grid[l][1] && grid[l][1] == grid[l][2] && grid[l][2] != '') {
        return grid[l][0];
      }
      if(grid[0][l] == grid[1][l] && grid[1][l] == grid[2][l] && grid[2][l] != '') {
        return grid[0][l];
      }
    }
    if(grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2] && grid[2][2] != '') {
      return grid[0][0];
    } else if(grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0] && grid[2][0] != '') {
      return grid[0][2];
    } else if(this.counter == 9) {
      return "draw";
    } else {
      return false;
    }
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
          <Grid.Column className="cursor-pointer" key={'col'+r+c} onClick={() => this.cellClicked(r, c)}>
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
    let { player, winner } = this.state;
    let gridContent;

    if(winner == "draw") {
      gridContent = (
        <div>
          <Icon name={this.cross} size="huge"/>
          <Icon name={this.circle} size="huge"/>
          <h3>Draw!</h3>
        </div>
      );
    } else if(winner) {
      gridContent = (
        <div>
          <Icon name={winner} size="massive"/>
          <h3>Winner!</h3>
        </div>
      );
    } else {
      gridContent = this.buildGrid();
    }

    return (
      <div className="app-container">
        <Header className="text-center" as='h3' content="Tic Tac Toe"/>
        <Segment className="app-segment">
          <div className="flex">
            <Dropdown size="mini" onChange={(e, {value}) => this.changeLevel(value)} options={this.options} value={this.state.level}/>
            <div className="text-right"><Icon name={player}/> Turn</div>
          </div>
          <div className="app-grid">
            {gridContent}
          </div>
          <div>
            <Button fluid onClick={() => this.resetGrid()}>Restart</Button>
          </div>
        </Segment>
      </div>
    );
  }

}
