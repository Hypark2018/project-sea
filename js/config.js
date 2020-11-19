const path = 'http://192.168.219.106:3000/graphql';

const request = function(query) {
    return {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({query})
    }
};