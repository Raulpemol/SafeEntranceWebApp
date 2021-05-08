export async function getPost(url = '', bodyData = {}){
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(bodyData)
    });

    return response;
}

export async function getOneParameterResponse(url = '', data = ''){
    const response = await fetch(url + '/' + data.replace(" ", "%20").replace("&","%26"), {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });
    
    return response.json();
}

export async function getResponseWithAuth(url = '', data = '', header = ''){
    const response = await fetch(url + '/' + data.replace(" ", "%20").replace("&","%26"), {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'token': header
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });

    return response;
}