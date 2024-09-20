let ScoreArray = [{"id": 1, "score": 1}, {"id": 2, "score": 2}];

function ScoreFunction(type, id, score) {
    switch(type) {
        case 'create':
            let newId = Math.max(...ScoreArray.map(item => item.id)) + 1;
            ScoreArray.push({"id": newId, "score": score});
            return ScoreArray;
        case 'read':
            return ScoreArray.find(item => item.id === id);
        case 'update':
            let item = ScoreArray.find(item => item.id === id);
            if(item) {
                item.score = score;
            }
            return ScoreArray;
        case 'delete':
            ScoreArray = ScoreArray.filter(item => item.id !== id);
            return ScoreArray;
        default:
            return "Invalid type";
    }
}
