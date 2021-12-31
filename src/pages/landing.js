import React from 'react';
import "../asset/css/style.scss";

//Components
import Tile from "../components/Tile";
import { sleep } from "../components/sleep";

import {
    Button,
    Container,
    Row,
    Col
} from 'react-bootstrap';

//Algorithms
import { BFS } from "../Algorithms/BFS";
import { DFS } from "../Algorithms/DFS";
import { Dijkstra } from "../Algorithms/Dijkstra";

class Landing extends React.Component {

    boardSize = 20;
    grid_value = 0;
    startX = 0;
    startY = 0;
    valueGrid = [[]];

    constructor(props) {
        super(props);
        this.state = {
            'stop': false,
            'grid': Array(this.boardSize).fill().map(x => Array(this.boardSize).fill("+"))
        }
        //binding this word to helper functions
        this.handleReset = this.handleReset.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.fillTiles = this.fillTiles.bind(this);
        this.handleBFS = this.handleBFS.bind(this);
        this.handleDFS = this.handleDFS.bind(this);
        this.generateRandomMaze = this.generateRandomMaze.bind(this);
        this.handleDijkstra = this.handleDijkstra.bind(this);

        this.state.grid[this.startX][this.startY] = "start_end";
        this.state.grid[this.boardSize - 1][this.boardSize - 1] = "start_end";

        this.grid_value = 0;
    }

    handleReset() {
        this.grid_value = 0;
        var newBoard = Array(this.boardSize).fill().map(x => Array(this.boardSize).fill("+"));
        newBoard[this.startX][this.startY] = "start_end";
        newBoard[this.boardSize - 1][this.boardSize - 1] = "start_end";
        this.setState({ 'stop': false, 'grid': newBoard });
    }

    handleStop() {
        this.grid_value = 0;
        this.setState({ 'stop': true });
    }

    handleClear() {
        this.grid_value = 0;
        var newBoard = this.state.grid;
        for (var i = 0; i < this.boardSize; i++) {
            for (var j = 0; j < this.boardSize; j++) {
                if (newBoard[i][j] !== "wall") {
                    newBoard[i][j] = "+";
                }
            }
        }
        newBoard[this.startX][this.startY] = "start_end";
        newBoard[this.boardSize - 1][this.boardSize - 1] = "start_end";
        this.setState({ "grid": newBoard, 'stop': false });
    }

    fillTiles(i, j, type) {
        const board = this.state.grid;
        board[i][j] = type;
        this.grid_value = 0;
        board[this.startX][this.startY] = "start_end";
        board[this.boardSize - 1][this.boardSize - 1] = "start_end";
        this.setState({ 'grid': board });
    }

    generateRandomMaze() {
        this.grid_value = 0;
        var board = Array(this.boardSize).fill().map(x => Array(this.boardSize).fill("+"));
        for (var i = 0; i < this.boardSize; i++) {
            for (var j = 0; j < this.boardSize; j++) {
                if (Math.floor(Math.random() * Math.floor(2)) === 0) {
                    if (Math.floor(Math.random() * Math.floor(2)) === 0) {
                        board[i][j] = "+";
                    }
                    else {
                        board[i][j] = "wall";
                    }
                }

            }
        }
        board[this.startX][this.startY] = "start_end";
        board[this.boardSize - 1][this.boardSize - 1] = "start_end";
        this.setState({ 'grid': board });
    }

    async handleBFS() {
        const board = this.state.grid;
        const { flood, isPathAvaiable, path } = BFS(board, this.startX, this.startY);
        console.log(path.length);
        for (var i = 0; i < flood.length; i++) {
            if (this.state.stop) {
                break;
            }
            this.fillTiles(flood[i].x, flood[i].y, "fill");
            await sleep(25);
        }
        if (isPathAvaiable) {
            for (i = 0; i < path.length; i++) {
                this.fillTiles(path[i].x, path[i].y, "path");
                await sleep(25);
                if (this.state.stop) {
                    break;
                }
            }
        }
    }

    async handleDijkstra() {
        const board = this.state.grid;
        const { flood, isPathAvaiable, path, valueGrid } = Dijkstra(board, this.startX, this.startY);
        this.valueGrid = valueGrid;
        console.log(path.length);
        for (var i = 0; i < flood.length; i++) {
            if (this.state.stop) {
                break;
            }
            this.fillTiles(flood[i].x, flood[i].y, "fill");
            await sleep(25);
        }
        if (isPathAvaiable) {
            for (i = 0; i < path.length; i++) {
                this.fillTiles(path[i].x, path[i].y, "path");
                await sleep(25);
                if (this.state.stop) {
                    break;
                }
            }
        }
    }

    async handleDFS() {
        const board = this.state.grid;
        const { flood, isPathAvaiable, path } = DFS(board, this.startX, this.startY);
        console.log(flood.length);
        for (var i = 0; i < flood.length; i++) {
            if (this.state.stop) {
                break;
            }
            this.fillTiles(flood[i].x, flood[i].y, "fill");
            await sleep(25);
        }
        if (isPathAvaiable) {
            for (i = 0; i < path.length - 1; i++) {
                if (this.state.stop) {
                    break;
                }
                this.fillTiles(path[i].x, path[i].y, "path");
                await sleep(25);
            }
        }
    }

    render() {
        const board = this.state.grid;
        const style = {
            textAlign: "center",
            margin: "auto",
            height: "auto",
            width: "500px",
            border: "1px solid black",
            tableLayout: 'fixed',
        };

        const createBoard = board.map((row, i) => {
            return (
                <tr key={"row_" + i}>
                    {row.map((col, j) => {
                        const color = board[i][j] === "+" ? '#F5B7B1' : board[i][j] === "wall" ? '#5D6D7E' : board[i][j] === "path" ? "#A93226" : board[i][j] === "start_end" ? '#000000' : "#F4D03F";
                        this.grid_value++;
                        if(this.valueGrid[0].length!==0){
                            this.grid_value = this.valueGrid[i][j];
                        }
                        if (board[i][j] === "wall") {
                            return (
                                <Tile handleClick={() => this.fillTiles(i, j, "+")} color={color} key={i + "_" + j} number={this.grid_value} />
                            )
                        }
                        else {
                            return (
                                <Tile handleClick={() => this.fillTiles(i, j, "wall")} color={color} key={i + "_" + j} number={this.grid_value} />
                            )
                        }
                    })}
                </tr>
            )
        })

        return (
            <>
                <Container>
                    <br></br><br></br>
                    {/* <h1 className="title">Path Finder</h1>
                    <br></br><br></br> */}
                    <Row>
                        <Col sm={2}>
                            <Button className="font-family-change" size="lg" block variant="warning" onClick={this.handleReset}>Reset</Button>{' '}
                            <Button className="font-family-change" size="lg" block variant="primary" onClick={this.handleClear}>Clear</Button>{' '}
                            <Button className="font-family-change" size="lg" block variant="danger" onClick={this.handleStop}>Stop</Button>{' '}
                            <Button className="font-family-change" size="lg" block variant="dark" onClick={this.handleBFS}>BFS</Button>{' '}
                            <Button className="font-family-change" size="lg" block variant="dark" onClick={this.handleDFS}>DFS</Button>{' '}
                            <Button className="font-family-change" size="lg" block variant="dark" onClick={this.handleDijkstra}>Dijkstra</Button>{' '}
                            <Button className="font-family-change" size="lg" block variant="dark" onClick={this.handleDFS}>A*</Button>{' '}
                            <br></br>
                            <h2 className='subtitle'>Maze</h2>
                            <Button className="font-family-change" size="lg" block variant="dark" onClick={this.generateRandomMaze}>Random</Button>{' '}
                        </Col>
                        <Col sm={9}>
                            <div style={{ margin: 'auto' }}>
                                <table cellSpacing="0" style={style}>
                                    <tbody>
                                        {createBoard}
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                        <br></br>
                    </Row>
                </Container>
                <br></br>
                <div
                    className="text-center p-3"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.9)", color: "#fff" }}>
                    Designed and Built by Nipun Waas
                </div>
            </>
        );
    }
}
export default Landing;
