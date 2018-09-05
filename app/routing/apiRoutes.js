const friends = require('../data/friends.js');

module.exports = function(app){
    app.get('/api/friends', function(req, res){
        res.json(friends);
    })

    app.post("/api/friends", function(req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body-parser middleware
        var newFriend = req.body;
      
        const friendsWithScores = friends.map(friend => ({
            ...friend,
            friendScore: friend.score
                .reduce((total, currentScore, i) => total + Math.abs(Number(newFriend.score[i]) - Number(currentScore)), 0)
        }))

        let match = friendsWithScores.sort((a, b) => a.friendScore - b.friendScore)[0]

        console.log('!!!', match);
      
        // We then add the json the user sent to the character array
        friends.push(newFriend);
        // console.log(friends);
      
        return res.json(match);
        
    }); 
}

console.log(friends);