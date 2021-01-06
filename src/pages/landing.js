import React from 'react';
import "../asset/css/style.scss";

//Components
import Tile from "../components/Tile";
import {sleep} from "../components/sleep";

import { 
    Button,
    Container,
    Row,
    Col
 } from 'react-bootstrap';

 //Algorithms
 import {BFS} from "../Algorithms/BFS";
 import {DFS} from "../Algorithms/DFS";

class Landing extends React.Component{

    boardSize = 20;
    grid_value = 0;

    constructor(props){
        super(props);
        this.state={
            'stop':false,
            'grid': Array(this.boardSize).fill().map(x=>Array(this.boardSize).fill("+"))
        }
        //binding this word to helper functions
        this.handleReset = this.handleReset.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.fillTiles = this.fillTiles.bind(this);
        this.handleBFS = this.handleBFS.bind(this);
        this.handleDFS = this.handleDFS.bind(this);

        this.state.grid[0][0] = "path";
        this.state.grid[this.boardSize-1][this.boardSize-1] = "path";
    }
    
    handleReset(){
        this.grid_value = 0;
        var newBoard = Array(this.boardSize).fill().map(x=>Array(this.boardSize).fill("+"));
        newBoard[0][0] = "path";
        newBoard[this.boardSize-1][this.boardSize-1] = "path";
        this.setState({'stop':false,'grid':newBoard});
    }

    handleStop(){
        this.grid_value = 0;
        this.setState({'stop':true});
    }

    handleClear(){
        this.grid_value = 0;
        var newBoard = this.state.grid;
        for(var i=0;i<this.boardSize;i++){
            for(var j=0;j<this.boardSize;j++){
                if(newBoard[i][j]!="wall"){
                    newBoard[i][j] = "+";
                }
            }
        }
        newBoard[0][0] = "path";
        newBoard[this.boardSize-1][this.boardSize-1] = "path";
        this.setState({"grid":newBoard});
    }

    fillTiles(i,j,type){
        const board = this.state.grid;
        board[i][j] = type;
        this.grid_value = 0 ;
        this.setState({'grid':board});
    }

    async handleBFS(){
        const board = this.state.grid;
        const {flood,isPathAvaiable,path} = BFS(board);
        console.log(path);
        for(var i =0;i<flood.length;i++){
            if(this.state.stop){
                break;
            }
            this.fillTiles(flood[i].x,flood[i].y,"fill");
            await sleep(25);
        }
        if(isPathAvaiable){
            for(var i =0;i<path.length;i++){
                if(this.state.stop){
                    break;
                }
                this.fillTiles(path[i].x,path[i].y,"path");
                await sleep(25);
            }
        }      
    }

    async handleDFS(){
        const board = this.state.grid;
        const {flood,isPathAvaiable,path} = DFS(board);
        console.log(path);
        for(var i =0;i<flood.length;i++){
            if(this.state.stop){
                break;
            }
            this.fillTiles(flood[i].x,flood[i].y,"fill");
            await sleep(25);
        }
        if(isPathAvaiable){
            for(var i =0;i<path.length;i++){
                if(this.state.stop){
                    break;
                }
                this.fillTiles(path[i].x,path[i].y,"path");
                await sleep(25);
            }
        }      
    }

    render(){
        const board = this.state.grid;
        const style = {
            textAlign: "center",
            margin:"auto",
            height: "auto",
            width:"500px",
            border:"1px solid black",
            tableLayout:'fixed',
        };

        const createBoard = board.map((row,i)=>{
            return (
                <tr key={"row_"+i}>
                    {row.map((col,j)=>{
                        const color = board[i][j] ==="+" ? '#48C9B0' : board[i][j] === "wall" ? '#5D6D7E': board[i][j] === "path" ? "#DE3163":"#BB8FCE";
                        this.grid_value++;
                        return (
                            <Tile handleClick={()=>this.fillTiles(i,j,"wall")} color={color} key={i+"_"+j} number={this.grid_value}/>
                        )
                    })}
                </tr>
            )
        })
        return(
            <Container>
                <br></br><br></br>
                <h1 className="title">Path Finder</h1>
                <br></br><br></br>
                <Row>
                    <Col sm={4}>
                        <h2 className="title">Settings</h2>
                        <br></br><br></br>
                        <Button size="lg" block variant="warning" onClick={this.handleReset}>Reset</Button>{' '}
                        <Button size="lg" block variant="primary" onClick={this.handleClear}>Clear</Button>{' '}
                        <Button size="lg" block variant="danger" onClick={this.handleStop}>Stop</Button>{' '}
                        <Button size="lg" block variant="dark" onClick={this.handleBFS}>BFS</Button>{' '}
                        <Button size="lg" block variant="dark" onClick={this.handleDFS}>DFS</Button>{' '}
                    </Col>
                    <Col sm={8}>
                        <div style={{margin: 'auto'}}>
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
        );
    }   
}
export default Landing;