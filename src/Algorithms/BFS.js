var moves = [[-1,0],[0,-1],[1,0],[0,1]];

function isCellAvailable(nextX,nextY,len,grid,visited){
    if(0<=nextX && 0<=nextY && nextY<len &&nextX<len && grid[nextX][nextY]!=="wall" && visited[nextX][nextY]===0){
        return true;
    }
    else{
        return false;
    }
}

export function BFS(grid,startX,startY){
    var len = grid.length;
    var finished = false;
    var flood = [];
    var visited = new Array(len);
    var predesor = new Array(len);

    for(var i=0;i<len;i++){
        visited[i] = new Array(len);
        predesor[i] = new Array(len);
        for(var j=0;j<len;j++){
            visited[i][j] = 0;
            predesor[i][j] = {x:0,y:0};
        }
    }

    var queue = [];
    var shortestPath = [];
    queue.push({x:startX,y:startY});
    visited[startX][startY] = 1;
    while(queue.length!==0){
        var cell = queue.shift()
        flood.push(cell);
        for(i=0;i<moves.length;i++){
            var nextX = cell.x+moves[i][0];
            var nextY = cell.y+moves[i][1];
            if(nextX===len-1 && nextY===len-1){
                predesor[nextX][nextY].x = cell.x;
                predesor[nextX][nextY].y = cell.y;
                finished = true;
                break;
            }
            if(isCellAvailable(nextX,nextY,len,grid,visited)){
                predesor[nextX][nextY].x = cell.x;
                predesor[nextX][nextY].y = cell.y;
                visited[nextX][nextY] = 1;
                queue.push({x:nextX,y:nextY});
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
    }

    flood.shift();
    flood.pop();
    const object = {flood:flood,isPathAvaiable:finished,path:shortestPath};
    return object;
}