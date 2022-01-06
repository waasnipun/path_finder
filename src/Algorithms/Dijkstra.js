const cell_distance = 1;
const diagonal_distance = 1.4;
var moves = [[-1,0],[0,-1],[1,0],[0,1]];

function isCellAvailable(nextX,nextY,len,grid,visited){
    if(0<=nextX && 0<=nextY && nextY<len && nextX<len && grid[nextX][nextY]!=="wall" && visited[nextX][nextY]===0){
        return true;
    }
    else{
        return false;
    }
}

export function Dijkstra(grid, startX,startY){
    var len = grid.length;
    var shortestPath = [];
    var finished = false;
    var flood = [];
    var visited = new Array(len);
    var predesor = new Array(len);
    var value_grid = new Array(len);

    for(var i=0;i<len;i++){
        visited[i] = new Array(len);
        predesor[i] = new Array(len);
        value_grid[i] = new Array(len);
        for(var j=0;j<len;j++){
            visited[i][j] = 0;
            predesor[i][j] = {x:0,y:0};
            value_grid[i][j] = Number.POSITIVE_INFINITY;
        }
    }

    var queue = [];
    visited[startX][startY] = 1;
    value_grid[startX][startY] = 0;
    queue.push({x:startX,y:startY});
    while(queue.length!==0){
        var cell = queue.shift();

        for(i=0;i<moves.length;i++){
            var nextX = cell.x + moves[i][0];
            var nextY = cell.y + moves[i][1];
            var nextValue = (Math.abs(moves[i][0])+Math.abs(moves[i][1])) === 2 ? diagonal_distance : cell_distance;

            if(nextX===len-1 && nextY === len-1 && value_grid[nextX][nextY] > value_grid[cell.x][cell.y]+nextValue){
                finished = true;
                value_grid[nextX][nextY] = value_grid[cell.x][cell.y]+nextValue;
                predesor[nextX][nextY].x = cell.x;
                predesor[nextX][nextY].y = cell.y;
                flood.push(cell);
                break;
            }

            if(isCellAvailable(nextX, nextY, len, grid, visited) && value_grid[nextX][nextY] > value_grid[cell.x][cell.y]+nextValue){
                value_grid[nextX][nextY] = value_grid[cell.x][cell.y]+nextValue;
                predesor[nextX][nextY].x = cell.x;
                predesor[nextX][nextY].y = cell.y;
                queue.push({x:nextX,y:nextY});
                flood.push(cell);
            }


        }
        if(finished){
            queue = [];
            var countX = len-1;
            var countY = len-1;
            while(countX!==startX || countY!==startY){
                var predesorCell = predesor[countX][countY];
                console.log(predesorCell);
                shortestPath.push(predesorCell);
                countX = predesorCell.x;
                countY = predesorCell.y;
            }
        }
        visited[cell.x][cell.y] = 1;
    }
    flood.shift();
    // flood.pop();
    const object = {flood:flood,isPathAvaiable:finished,path:shortestPath,valueGrid:value_grid};
    return object;

}