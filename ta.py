import requests

data = {'username': 'myusername', 'password': 'mypassword'}
response = requests.post('http://127.0.0.1:5000/create-log', json=data)

if response.status_code == 200:
    print('Log file created successfully')
else:
    print('Error creating log file')
