from bottle import route, run, template

@route('/top_bar')
def send_iframe_html(): 
    return template('start')

@route('/word_cloud')
def generate_word_cloud():
    access_token = your_access_token
    header = {'Authorization': 'Bearer {}'.format(access_token)}
    url = 'https://z3nericagirges.zendesk.com/api/v2/incremental/tickets.json?start_time={unix_time}'
    r = requests.get(url, headers=header)
    if r.status_code == 200:
        words = r.json()
        return template('word_cloud', cloud=words['data'])
    else:
        msg = 'Problem with the request: {} {}'.format(r.status_code, r.reason)
        return msg

run(host='localhost', port=8080, debug=True)