var startX = 0;
var startY = 0;
var moves = [[-1,0],[0,-1],[1,0],[0,1]];
var visited = new Array(20);
var predesor = new Array(20);
var finished = false;
var flood = [];

for(var i=0;i<20;i++){
    visited[i] = new Array(20);
    predesor[i] = new Array(20);
    for(var j=0;j<20;j++){
        visited[i][j] = 0;
        predesor[i][j] = {x:0,y:0};
    }
}

function isCellAvailable(nextX,nextY,len,grid,visited){
    if(0<=nextX && 0<=nextY && nextY<len &&nextX<len && grid[nextX][nextY]!=="wall" && visited[nextX][nextY]===0){
        return true;
    }
    else{
        return false;
    }
}

function DFS_implement(x,y,len,grid){
    visited[x][y] = 1;
    flood.push({x:x,y:y});
    for(var i =0;i<moves.length;i++){
        var nextX = x+moves[i][0];
        var nextY = y+moves[i][1];
        if(nextX===len-1 && nextY===len-1){
            predesor[nextX][nextY].x = x;
            predesor[nextX][nextY].y = y;
            finished = true;
            return ;
        }
        if(isCellAvailable(nextX,nextY,len,grid,visited) && !finished){
            DFS_implement(nextX,nextY,len,grid);
            predesor[nextX][nextY].x = x;
            predesor[nextX][nextY].y = y;
        }
    }
}
export function DFS(grid){
    var len = grid.length;
    var shortestPath = [];

    DFS_implement(startX,startY,len,grid);

    if(finished){
        var countX = len-1;
        var countY = len-1;
        while(countX!==0 || countY!==0){
            var predesorCell = predesor[countX][countY];
            console.log(predesorCell);
            shortestPath.push(predesorCell);
            countX = predesorCell.x;
            countY = predesorCell.y;
        }
        shortestPath.push({x:0,y:0});
    }


    const object = {flood:flood,isPathAvaiable:finished,path:shortestPath};
    return object;
}