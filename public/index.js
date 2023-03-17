// Client ID
// 974935965592-lpojfpui5rl7d3rdkpaapaj65okklt4b.apps.googleusercontent.com
// Client secret
// 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



function signIn(){
    let oauth2Endpoint ='https://accounts.google.com/o/oauth2/v2/auth';

    let form = document.createElement('form')
    form.setAttribute('method','GET')
    form.setAttribute('action',oauth2Endpoint)

    let params ={
        'client_id':'974935965592-lpojfpui5rl7d3rdkpaapaj65okklt4b.apps.googleusercontent.com',
        "redirect_uri":'http://localhost:4400/success',
        'response_type':'code',
        "scope":'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email  https://www.googleapis.com/auth/calendar',
        "include_granted_scopes":'true',
        'state':'pass-throught-value',
        'accessType':"offline"

    }

    for(let p in params){
        // console.log(p,params[p])
        let input = document.createElement('input');
        input.setAttribute('type','hidden')
        input.setAttribute('name',p)
        input.setAttribute('value',params[p])
        form.appendChild(input);
    }
    document.body.appendChild(form)
    form.submit()
}
