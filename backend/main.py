import os
import sqlite3
import array
import time
import pickle
from flask import Flask, request, jsonify
from flask_jwt_extended import (
	JWTManager, jwt_required, create_access_token,
	jwt_refresh_token_required, create_refresh_token,
	get_jwt_identity, set_access_cookies,
	set_refresh_cookies, unset_jwt_cookies
)
from flask import g

DATABASE = 'database.db'
STATIC_PATH = "../frontend/build"
MONTH_SEC = 2628000

app = Flask(__name__, static_url_path='', static_folder=STATIC_PATH)
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_REFRESH_CSRF_COOKIE_NAME'] = 'auth'
app.config['JWT_ACCESS_COOKIE_PATH'] = '/'
app.config['JWT_REFRESH_COOKIE_PATH'] = '/token/refresh'
app.config['JWT_COOKIE_CSRF_PROTECT'] = False # For test change to False
app.config['JWT_SECRET_KEY'] = 'sss_key_sss_112123123u8sdrqaf'  # Change this!

jwt = JWTManager(app)


def get_db():
	db = getattr(g, '_database', None)
	if db is None:
		db = g._database = sqlite3.connect(DATABASE)
	return db


@app.teardown_appcontext
def close_connection(exception):
	db = getattr(g, '_database', None)
	if db is not None:
		db.close()


def status(stat):
	return {'status': stat}


@app.route('/')
def hello():
	return app.send_static_file('index.html')


@app.route('/<name>')
def front_path(name):
	return app.send_static_file('index.html')


def signin(content, cur):
	email = content.get('email')
	password = content.get('password')
	if not email or not password:
		return jsonify(status("wrong email or password")), 200
	cur.execute("select * from users where email = ? and password = ?", (email, password))
	is_ok = cur.fetchone()
	if is_ok is None:
		return jsonify(status("wrong email or password")), 200
	id_user = is_ok[0]
	access_token = create_access_token(identity=id_user)
	refresh_token = create_refresh_token(identity=id_user)
	resp = jsonify(status('ok'))
	set_access_cookies(resp, access_token)
	set_refresh_cookies(resp, refresh_token)
	return resp, 200


def signup(content, cur):
	email = content.get('email')
	password = content.get('password')
	name = content.get('name')
	surname = content.get('surname')
	phone = content.get('phone')
	if not email:
		return jsonify(status('No email')), 200
	if not password:
		return jsonify(status('No password')), 200
	if not name:
		return jsonify(status('No name')), 200
	if not surname:
		return jsonify(status('No surname')), 200
	if not phone:
		return jsonify(status('No phone')), 200
	sql = "SELECT * FROM users WHERE email = ? and password = ?"
	user = cur.execute(sql, (email, password))
	is_ok = user.fetchone()
	if is_ok is not None:
		return jsonify(status('User with this email already exists')), 200
	sql = "INSERT INTO users (email, password, name, surname, phone) VALUES (?, ?, ?, ?, ?)"
	cur.execute(sql, (email, password, name, surname, phone))
	id_user = cur.lastrowid
	access_token = create_access_token(identity=id_user)
	refresh_token = create_refresh_token(identity=id_user)
	resp = jsonify(status('ok'))
	set_access_cookies(resp, access_token)
	set_refresh_cookies(resp, refresh_token)
	return resp, 200


@app.route('/api/<method>', methods=['POST'])
def api(method):
	content = request.json
	cur = get_db().cursor()
	if method == 'signin':
		resp = signin(content, cur)
	elif method == 'signup':
		resp = signup(content, cur)
	get_db().commit()
	return resp

def registration_data(user_id):
	cur = get_db().cursor()
	sql = "SELECT * FROM users WHERE id = ?"
	cur.execute(sql, (user_id, ))
	reg_data = cur.fetchone()
	if reg_data is None:
		return status('No registration data')
	return {
		'name': reg_data[3],
		'surname': reg_data[4],
		'phone': reg_data[5],
		'email': reg_data[1]
	}


def personal_data(user_id):
	cur = get_db().cursor()
	sql = "SELECT * FROM personal WHERE id = ?"
	cur.execute(sql, (user_id, ))
	per_data = cur.fetchone()
	if per_data is None:
		return status('No personal data')
	return {'birthday': per_data[1],
			'sex': per_data[2],
			'citizenship': per_data[3],
			'position': per_data[4]
			}


def cvalification_data(user_id):
	cur = get_db().cursor()
	sql = "SELECT * FROM cvalification WHERE id = ?"
	cur.execute(sql, (user_id, ))
	cva_data = cur.fetchone()
	if cva_data is None:
		return status('No cvalification data')
	return {'totalExperience': cva_data[1],
			'positionExperience': cva_data[2],
			'allowance': cva_data[3],
			'rating': cva_data[4]
			}

@app.route('/api/profile', methods=['POST'])
@jwt_required
def profile():
	content = request.json
	cur = get_db().cursor()
	id_user = get_jwt_identity()
	reg_data = registration_data(id_user)
	per_data = personal_data(id_user)
	cva_data = cvalification_data(id_user)
	resp = jsonify(registationData=reg_data,
					personalData=per_data,
					cvalificationData=cva_data,
					status='ok')
	return resp, 200


def insert_order(order_id, cur, id_user, directions):
	for d in directions:
		sql = "INSERT INTO directions (direction, duration, overtime, weekends, departureTime, comment, order_id) VALUES (?, ?, ?, ?, ?, ?, ?)"
		cur.execute(sql, (d['direction'], d['duration'], d['overtime'], pickle.dumps(d['weekends']), d['departureTime'], d['comment'], order_id))
	get_db().commit()


@app.route('/api/create_order', methods=['POST'])
@jwt_required
def create_order():
	content = request.json
	cur = get_db().cursor()
	id_user = get_jwt_identity()
	order_id = content.get('id')
	directions = content.get('directions')
	if order_id is None:
		sql = "INSERT INTO orders (user_id, date, validityDate) VALUES (?, ?, ?)"
		cur.execute(sql, (id_user, round(time.time()), round(time.time()) + MONTH_SEC))
		order_id = cur.lastrowid
	else:
		sql = 'SELECT * FROM orders WHERE id = ? and user_id = ?'
		cur.execute(sql, (order_id, id_user))
		is_edit = cur.fetchone()
		if is_edit is None:
			resp = jsonify(status('No order with this id'))
			return resp, 200
		# if is_edit[8] == 1: # it is doesn't work :(
		sql = "DELETE FROM directions WHERE order_id = ?"
		cur.execute(sql, (order_id, ))
		sql = "UPDATE orders SET date = ? WHERE id = ?"
		cur.execute(sql, (round(time.time()), order_id))
		# else:
		# 	resp = jsonify(status('No permission for edit'))
		# 	return resp, 200
	insert_order(order_id, cur, id_user, directions)
	resp = jsonify(status('ok'))
	return resp, 200

@app.route('/api/order_data', methods=['POST'])
@jwt_required
def order_data():
	content = request.json
	cur = get_db().cursor()
	order_id = content.get('order_id')
	sql = "SELECT * FROM directions WHERE order_id = ?"
	cur.execute(sql, (order_id, ))
	orders = cur.fetchall()
	res = []
	for order in orders:
		res.append(
			{
				'direction': order[1],
				'duration': order[2],
				'overtime': order[3],
				'weekends': pickle.loads(order[4]),
				'departureTime': order[5],
				'comment': order[6]
			}
		)
	return jsonify(directions=res, status='ok'), 200

@app.route('/api/order_history', methods=['POST'])
@jwt_required
def order_history():
	content = request.json
	cur = get_db().cursor()
	user_id = get_jwt_identity()
	sql = "SELECT * FROM orders WHERE user_id = ?"
	cur.execute(sql, (user_id, ))
	orders = cur.fetchall()
	res = []
	for order in orders:
		res.append({
			'id': order[0],
			'date': order[2],
			'reliabilityIndex': order[3],
			'bonuses': order[4],
			'approvalStatus': order[5],
			'scheduleSatisfaction': order[6],
			'validityDate':order[7],
			'edit': order[8]
		})
	return jsonify(history=res, status="ok"), 200


@app.route('/token/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
	# Create the new access token
	current_user = get_jwt_identity()
	access_token = create_access_token(identity=current_user)

	# Set the JWT access cookie in the response
	resp = jsonify({'refresh': True})
	set_access_cookies(resp, access_token)
	return resp, 200


@app.route('/api/remove_token', methods=['POST'])
def logout():
	resp = jsonify(status('ok'))
	unset_jwt_cookies(resp)
	return resp, 200


if __name__ == '__main__':
	app.run(host='0.0.0.0', port=80)
