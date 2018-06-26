import {CREATE_USER} from './CONST';

export const createUser = (signupData) => ((dispatch) => {
    fetch('http://localhost:1337/rest/create-account', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(signupData)
    }).then(resp => resp.json())
    .then(payload => dispatch({
        type: CREATE_USER,
        payload
    }))
    .catch(err => {
        console.log("ERROR occured!", err)
    })
})