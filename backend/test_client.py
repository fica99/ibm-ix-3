import requests

LOCAL_HOST = "http://127.0.0.1:5000"

signup_host = LOCAL_HOST + "/api/signup"
signin_host = LOCAL_HOST + "/api/signin"
profile_host = LOCAL_HOST + "/api/profile"
create_order_host = LOCAL_HOST + "/api/create_order"
order_data_host = LOCAL_HOST + "/api/order_data"
order_history_host = LOCAL_HOST + "/api/order_history"

def get_valid_signup_data():
	return {
		'name': 'Filip',
		'surname': 'Crnobrnja',
		'phone': '89152413881',
		'email': 'fica.c@yandex.ru',
		'password': '1234'
	}

def get_invalid_signup_data():
	return {
		'name': 'Filip',
		'surname': 'Filip',
		'phone': '89152413881',
		'email': 'fica.c@yandex.ru',
	}

def get_valid_signin_data():
	return {
		'email': 'fica.c@yandex.ru',
		'password': '1234'
	}

def get_invalid_signin_data():
	return {
		'email': 'fica.c@yandex.ru',
		'password': '12345'
	}

def send_order():
	return {
		'directions': [
			{
				'direction': 'Belgrade',
				'duration': 100,# time in hours
				'overtime': 1, # Yes
				'weekends': [100, 23, 343, 345], #timestamp
				'departureTime': 100, #timestamp
				'comment': 'test'
			},
			{
				'direction': 'Moscow',
				'duration': 10, # time in hours
				'overtime': 0, # No
				'weekends': [100, 4234, 432545], #timestamp
				'departureTime': 200,# timestamp
				'comment': 'Mother'
			}
		]
	}

def change_order():
	return {
		'id': 24,
		'directions': [
			{
				'direction': 'Paris',
				'duration': 143,
				'overtime': 0,
				'weekends': [43243, 23423, 234523, 342534],
				'departureTime': 10320,
				'comment': 'testing changing order'
			}
		]
	}

def main():
	s = requests.Session()
	signup_invalid = s.post(signup_host, json=get_invalid_signup_data())
	print("signup_invalid json - ", signup_invalid.text)

	signup_valid = s.post(signup_host, json=get_valid_signup_data())
	print("signup_valid json - ", signup_valid.text)

	signin_invalid = s.post(signin_host, json=get_invalid_signin_data())
	print("signin_invalid json - ", signin_invalid.text)

	profile_without_token = s.post(profile_host)
	print("profile_without_token - ", profile_without_token.text)

	signin_valid = s.post(signin_host, json=get_valid_signin_data())
	print("signin_valid json - ", signin_valid.text)

	profile_with_token = s.post(profile_host)
	print("profile_with_token - ", profile_with_token.text)

	create_order = s.post(create_order_host, json = send_order())
	print('create_order - ', create_order.text)

	update_order = s.post(create_order_host, json = change_order())
	print('update_order - ', update_order.text)

	get_order = s.post(order_data_host, json = {'order_id': 24})
	print('get_order', get_order.text)

	get_order_history = s.post(order_history_host)
	print('get_order', get_order_history.text)

if __name__ == "__main__":
	main()

