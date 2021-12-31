const cell_distance = 1;
const diagonal_distance = 1.4;

export function Dijkstra(grid, start_X,startY){
    var len = grid.length;
    var shortestPath = [];
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


}